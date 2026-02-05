import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from './axiosInstance';

declare global {
    interface Window {
        Pusher: typeof Pusher;
    }
}

interface Channel {
    name: string;
}

interface AuthorizerCallback {
    (error: Error | null, data?: any): void;
}

export const createEchoInstance = () => {
    if (typeof window === 'undefined') {
        console.log('Echo: Window is undefined, returning null');
        return null;
    }

    // Verificar se as variáveis de ambiente estão definidas
    const appKey = process.env.NEXT_PUBLIC_REVERB_APP_KEY;
    const wsHost = process.env.NEXT_PUBLIC_REVERB_HOST;
    const wsPort = process.env.NEXT_PUBLIC_REVERB_PORT;
    const scheme = process.env.NEXT_PUBLIC_REVERB_SCHEME;

    if (!appKey || !wsHost || !wsPort) {
        console.error('Echo: Missing environment variables:', {
            appKey: !!appKey,
            wsHost: !!wsHost,
            wsPort: !!wsPort,
            scheme
        });
        return null;
    }

    if (!window.Pusher) {
        window.Pusher = Pusher;
    }

    console.log('Echo: Creating instance with config:', {
        broadcaster: 'reverb',
        key: appKey,
        wsHost,
        wsPort,
        scheme,
        forceTLS: (scheme ?? 'https') === 'https'
    });

    const echo = new Echo({
        broadcaster: 'reverb',
        key: appKey,
        wsHost,
        wsPort: parseInt(wsPort),
        wssPort: parseInt(wsPort),
        forceTLS: (scheme ?? 'https') === 'https',
        enabledTransports: ['ws', 'wss'],
        encrypted: true,
        authorizer: (channel: Channel) => {
            console.log('Echo: Authorizing channel:', channel.name);
            return {
                authorize: (socketId: string, callback: AuthorizerCallback) => {
                    console.log('Echo: Authorizing socket:', socketId, 'for channel:', channel.name);

                    axios.defaults.withCredentials = true;
                    axios.defaults.withXSRFToken = true;

                    axios.post('/broadcasting/auth',
                        {
                            socket_id: socketId,
                            channel_name: channel.name,
                        },
                        {
                            withCredentials: true,
                            headers: {
                                Accept: 'application/json',
                            }
                        }
                    )
                        .then(response => {
                            console.log('Echo: Authorization successful for channel:', channel.name);
                            callback(null, response.data);
                        })
                        .catch(error => {
                            console.error('Echo: Authorization failed for channel:', channel.name, error);
                            callback(error instanceof Error ? error : new Error(String(error)), null);
                        });
                }
            };
        }
    });

    console.log('Echo: Instance created successfully');
    return echo;
};

let echoInstance: Echo<any> | null = null;

export const getEchoInstance = () => {
    if (!echoInstance) {
        console.log('Echo: Creating new instance');
        echoInstance = createEchoInstance();
    } else {
        console.log('Echo: Returning existing instance');
    }
    return echoInstance;
};