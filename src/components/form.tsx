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
    <form className="flex-[0_0_360px] space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-200/50">
      <div className="field">
        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">
          Nombres <span className="text-shield-red">*</span>
        </label>

        <input
          type="text"
          name="firstName"
          value={data.firstName}
          onChange={handleChange}
          required
          aria-required={true}
          className="w-full border-b-2 border-gray-200 px-0 pb-2 pt-1 text-sm text-gray-800 outline-none transition-colors focus:border-brand-yellow"
        />
      </div>

      <div className="field">
        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">
          Apellidos <span className="text-shield-red">*</span>
        </label>

        <input
          type="text"
          name="lastName"
          value={data.lastName}
          onChange={handleChange}
          required
          aria-required={true}
          className="w-full border-b-2 border-gray-200 px-0 pb-2 pt-1 text-sm text-gray-800 outline-none transition-colors focus:border-brand-yellow"
        />
      </div>

      <div className="field">
        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">
          Cargo <span className="text-shield-red">*</span>
        </label>

        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          required
          aria-required={true}
          className="w-full border-b-2 border-gray-200 px-0 pb-2 pt-1 text-sm text-gray-800 outline-none transition-colors focus:border-brand-yellow"
        />
      </div>

      <div className="field">
        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">
          Dependencia <span className="text-shield-red">*</span>
        </label>

        <input
          type="text"
          name="dept"
          value={data.dept}
          onChange={handleChange}
          required
          aria-required={true}
          className="w-full border-b-2 border-gray-200 px-0 pb-2 pt-1 text-sm text-gray-800 outline-none transition-colors focus:border-brand-yellow"
        />
      </div>

      <div className="field">
        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">
          Grupo de trabajo
        </label>

        <input
          type="text"
          name="group"
          value={data.group}
          onChange={handleChange}
          className="w-full border-b-2 border-gray-200 px-0 pb-2 pt-1 text-sm text-gray-800 outline-none transition-colors focus:border-brand-yellow"
        />
      </div>

      <div className="field">
        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">
          Correo electrónico <span className="text-shield-red">*</span>
        </label>

        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
          aria-required={true}
          className="w-full border-b-2 border-gray-200 px-0 pb-2 pt-1 text-sm text-gray-800 outline-none transition-colors focus:border-brand-yellow"
        />
      </div>

      <div className="field">
        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">
          Contacto
        </label>

        <input
          type="text"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          className="w-full border-b-2 border-gray-200 px-0 pb-2 pt-1 text-sm text-gray-800 outline-none transition-colors focus:border-brand-yellow"
        />
      </div>

      <div className="field">
        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">
          Dirección <span className="text-shield-red">*</span>
        </label>

        <input
          type="text"
          name="address"
          value={data.address}
          onChange={handleChange}
          required
          aria-required={true}
          className="w-full border-b-2 border-gray-200 px-0 pb-2 pt-1 text-sm text-gray-800 outline-none transition-colors focus:border-brand-yellow"
        />
      </div>

      <div className="field">
        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">
          Ciudad <span className="text-shield-red">*</span>
        </label>

        <input
          type="text"
          name="city"
          value={data.city}
          onChange={handleChange}
          required
          aria-required={true}
          className="w-full border-b-2 border-gray-200 px-0 pb-2 pt-1 text-sm text-gray-800 outline-none transition-colors focus:border-brand-yellow"
        />
      </div>

      <div className="field">
        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">
          Sitio web <span className="text-shield-red">*</span>
        </label>

        <input
          type="text"
          name="web"
          value={data.web}
          onChange={handleChange}
          required
          aria-required={true}
          className="w-full border-b-2 border-gray-200 px-0 pb-2 pt-1 text-sm text-gray-800 outline-none transition-colors focus:border-brand-yellow"
        />
      </div>
    </form>
  );
};
