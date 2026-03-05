import { SuccessIcon, CopiedIcon, EyeToggleIcon, VolumeIcon } from "../ui/animated-state-icons";

const DashboardPreview = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-black p-6 overflow-auto">
      {/* Header do Dashboard */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-amber-500 text-outline-white mb-2">Dashboard</h2>
        <p className="text-gray-400 text-outline-white">Visão geral do seu sistema veterinário</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { icon: EyeToggleIcon, title: "Consultas Hoje", value: "8", color: "#60A5FA" },
          { icon: SuccessIcon, title: "Pendentes", value: "3", color: "#FBBF24" },
          { icon: CopiedIcon, title: "Receitas", value: "12", color: "#34D399" },
          { icon: VolumeIcon, title: "Esta Semana", value: "42", color: "#A78BFA" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4 hover:border-amber-500/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center">
                <stat.icon size={20} color={stat.color} />
              </div>
              <p className="text-sm text-gray-400">{stat.title}</p>
            </div>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Próximas Consultas */}
      <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-amber-500 text-outline-white mb-4">Próximas Consultas</h3>
        <div className="space-y-3">
          {[
            { pet: "Rex", tutor: "João Silva", horario: "14:00" },
            { pet: "Mimi", tutor: "Maria Santos", horario: "15:30" },
            { pet: "Thor", tutor: "Pedro Costa", horario: "16:00" },
          ].map((consulta, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-lg hover:bg-zinc-900 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <span className="text-amber-500 font-semibold">{consulta.pet[0]}</span>
                </div>
                <div>
                  <p className="font-medium text-white">{consulta.pet}</p>
                  <p className="text-sm text-gray-400">{consulta.tutor}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-amber-500 font-semibold">{consulta.horario}</p>
                <p className="text-xs text-gray-500">Hoje</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gráfico mockup */}
      <div className="mt-6 bg-zinc-800/50 border border-zinc-700 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-amber-500 text-outline-white mb-4">Consultas da Semana</h3>
        <div className="h-40 flex items-end justify-between gap-2">
          {[65, 45, 80, 55, 90, 70, 60].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-gradient-to-t from-amber-500 to-amber-300 rounded-t-lg transition-all hover:from-amber-400 hover:to-amber-200"
                style={{ height: `${height}%` }}
              />
              <span className="text-xs text-gray-500">
                {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
export { DashboardPreview };
