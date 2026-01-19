import { PawPrint } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    servicos: [
      { label: "Consultas", href: "#servicos" },
      { label: "Vacinação", href: "#servicos" },
      { label: "Cirurgias", href: "#servicos" },
      { label: "Exames", href: "#servicos" },
    ],
    empresa: [
      { label: "Sobre Nós", href: "#sobre" },
      { label: "Sistema", href: "#sistema" },
      { label: "Depoimentos", href: "#depoimentos" },
      { label: "Contato", href: "#contato" },
    ],
    legal: [
      { label: "Política de Privacidade", href: "#" },
      { label: "Termos de Uso", href: "#" },
    ],
  };

  return (
    <footer className="bg-charcoal text-charcoal-light pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <PawPrint className="w-5 h-5 text-gold" />
              </div>
              <span className="font-display text-xl font-semibold text-cream">
                Vet<span className="text-gold neon-text-yellow">+</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed opacity-80 mb-4">
              Atendimento veterinário domiciliar com amor e dedicação. 
              Cuidado profissional no conforto da sua casa.
            </p>
            <p className="text-xs opacity-60">CRMV-RJ 12345</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-cream mb-4">
              Serviços
            </h4>
            <ul className="space-y-2">
              {links.servicos.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-cream mb-4">
              Empresa
            </h4>
            <ul className="space-y-2">
              {links.empresa.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-cream mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {links.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-charcoal-light/20 text-center">
          <p className="text-sm opacity-60">
            © {currentYear} Vet+. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
