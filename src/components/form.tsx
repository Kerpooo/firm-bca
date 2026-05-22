import type { InformationFormProps } from "../interfaces/main";

export const InformationForm = ({ data, onChange }: InformationFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    onChange({
      ...data,
      [name]: value,
    });
  };

  return (
    <form className="flex-[0_0_340px] space-y-4 rounded-xl bg-white px-6 py-7 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
      <div className="field flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">
          Nombre completo
        </label>

        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div className="field flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">Cargo</label>

        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div className="field flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">
          Dependencia
        </label>

        <input
          type="text"
          name="dept"
          value={data.dept}
          onChange={handleChange}
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div className="field flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">
          Grupo de trabajo
        </label>

        <input
          type="text"
          name="group"
          value={data.group}
          onChange={handleChange}
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div className="field flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">
          Correo electrónico
        </label>

        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div className="field flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">Contacto</label>

        <input
          type="text"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div className="field flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">Dirección</label>

        <input
          type="text"
          name="address"
          value={data.address}
          onChange={handleChange}
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div className="field flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">Ciudad</label>

        <input
          type="text"
          name="city"
          value={data.city}
          onChange={handleChange}
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div className="field flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">Sitio web</label>

        <input
          type="text"
          name="web"
          value={data.web}
          onChange={handleChange}
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>
    </form>
  );
};
