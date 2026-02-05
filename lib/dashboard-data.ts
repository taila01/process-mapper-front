// Mock data for the dashboard charts

export const dashboardData = {
  // Data for Clientes Consultados Facta
  clientsData: {
    labels: ['Com Saldo', 'Sem Saldo', 'Bloqueados', 'Falha'],
    values: [61, 32, 43, 18],
    colors: ['#10B981', '#9CA3AF', '#FBBF24', '#EF4444']
  },

  // Data for Pirâmide de Comissão Facta
  commissionData: {
    labels: ['Total Pago', 'Comissão Recebida', 'Comissão Paga na Meta'],
    values: [1993.18, 474.46, 237.23],
    formattedValues: ['R$ 1.993,18', 'R$ 474,46', 'R$ 237,23'],
    colors: ['#3B82F6', '#10B981', '#EF4444']
  },

  // Data for Resultado do Disparo
  campaignResultsData: {
    categories: ['Disparo'],
    series: [
      { name: 'Disparado', data: [4000], color: '#4D7C0F' },
      { name: 'Respostas', data: [372], color: '#EA580C' },
      { name: 'Carteirizados', data: [164], color: '#84CC16' },
      { name: 'Com Saldo', data: [61], color: '#FBBF24' },
      { name: 'Vendido', data: [38], color: '#3B82F6' },
      { name: 'Pagos', data: [20], color: '#10B981' },
    ]
  },

  // Data for Total de Vendas
  salesData: {
    labels: ['Total Pago', 'Aguardando Pagamento', 'Aguardando Assinatura', 'Cancelados'],
    values: [1993.18, 174.42, 1020.71, 1251.48],
    formattedValues: ['R$ 1.993,18', 'R$ 174,42', 'R$ 1.020,71', 'R$ 1.251,48'],
    colors: ['#10B981', '#3B82F6', '#FBBF24', '#EF4444']
  }
};