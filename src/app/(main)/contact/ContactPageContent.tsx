"use client";

import { useActionState } from "react";
import { sendContactEmail } from "@/actions/contact";
import type {
  PageHeader as PageHeaderType,
  SiteSetting,
} from "@/payload-types";
import {
  PageHeader,
  PageMainWrapper,
  SectionContainer,
  Title,
  Heading,
} from "@/components";
import { CTAGroupButtons } from "@/components/shared/ui/CTAGroupButtons";
import { ArrowRight, Phone } from "lucide-react";
import { ContactForm } from "./components/ContactForm";
import { ContactInfo } from "./components/ContactInfo";
import { ContactMap } from "./components/ContactMap";
import { SuccessMessage } from "./components/SuccessMessage";
import { SITE_CONFIG } from "@/config/site";

interface ContactPageContentProps {
  header: PageHeaderType | null;
  siteSettings: SiteSetting;
}

const initialState = {
  success: false,
  message: "",
  errors: {},
};

export default function ContactPageContent({
  header,
  siteSettings,
}: ContactPageContentProps) {
  const [state, formAction, isPending] = useActionState(
    sendContactEmail,
    initialState,
  );

  const contactInfoItems = [
    {
      icon: "Phone",
      label: "TÉLÉPHONE",
      value: siteSettings.contactPhone || "07 81 25 11 25",
      href: `tel:${
        siteSettings.contactPhone?.replace(/\s/g, "") || "0781251125"
      }`,
      description: "Du lundi au vendredi, 8h-19h",
    },
    {
      icon: "Mail",
      label: "EMAIL",
      value: siteSettings.contactEmail || "contact@bnb-energie.fr",
      href: `mailto:${siteSettings.contactEmail || "contact@bnb-energie.fr"}`,
      description: "Réponse sous 24h ouvrées",
    },
    {
      icon: "MapPin",
      label: "ADRESSE",
      value: siteSettings.addressStreet
        ? `${siteSettings.addressStreet}, ${siteSettings.addressZip} ${siteSettings.addressCity}`
        : "Bourg-en-Bresse, Ain (01)",
      description: "Intervention dans tout l'Ain (01)",
    },
  ];

  const mapAddress = siteSettings.addressStreet
    ? `${siteSettings.addressStreet}, ${siteSettings.addressZip} ${siteSettings.addressCity}`
    : "Bourg-en-Bresse, Ain (01)";

  return (
    <PageMainWrapper variant="teal">
      <PageHeader variant="simple" height="medium">
        <div className="flex max-w-6xl flex-col items-center gap-6">
          <Title
            staticText={header?.title.split("-")?.[0] || "Contactez"}
            animatedText={header?.title.split("-")?.[1] || "-nous"}
            subtitle={header?.description ?? ""}
          />
          <CTAGroupButtons
            align="center"
            animated
            items={[
              {
                label: "Devis gratuit",
                href: "/contact#contact-form",
                variant: "default",
                size: "sm",
                iconRight: <ArrowRight className="size-4" />,
                className: "bg-gradient-to-br from-primary-200 to-cyan-500",
              },
              {
                label: SITE_CONFIG.contact.phone,
                href: SITE_CONFIG.contact.phoneHref,
                variant: "outline",
                size: "sm",
                iconLeft: <Phone className="size-4" />,
              },
            ]}
          />
        </div>
      </PageHeader>

      <div id="contact-section" className="relative z-10 -mt-24 pb-24">
        <SectionContainer>
          <div className="overflow-hidden rounded-2xl shadow-2xl lg:grid lg:grid-cols-5">
            <div className="relative bg-slate-900 dark:bg-black px-8 py-12 lg:col-span-2 lg:px-12 lg:py-16 overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-blue-900/20 to-slate-900/50" />
              <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <Heading className="text-3xl text-white mb-6">
                    Discutons de votre projet
                  </Heading>
                  <p className="text-slate-300 mb-12 leading-relaxed text-lg">
                    Notre équipe d'experts est à votre écoute pour étudier vos
                    besoins et vous proposer la solution solaire la plus
                    adaptée.
                  </p>

                  <ContactInfo items={contactInfoItems} />
                </div>

                <div className="mt-12 pt-8 border-t border-white/10">
                  <p className="text-sm text-slate-400">
                    BNB ÉNERGIE - Votre partenaire solaire dans l'Ain
                  </p>
                </div>
              </div>
            </div>

            <div
              className="bg-white dark:bg-content1 px-8 py-12 lg:col-span-3 lg:px-12 lg:py-16"
              id="contact-form"
            >
              <div className="max-w-lg mx-auto lg:mx-0 lg:max-w-none">
                <Heading className="text-2xl text-slate-900 dark:text-white mb-2">
                  Envoyez-nous un message
                </Heading>
                <p className="text-slate-500 dark:text-neutral-400 mb-8">
                  Remplissez le formulaire ci-dessous, nous vous répondrons sous
                  24h.
                </p>

                {state.success ? (
                  <SuccessMessage message={state.message} />
                ) : (
                  <ContactForm
                    formAction={formAction}
                    state={state}
                    isPending={isPending}
                  />
                )}
              </div>
            </div>
          </div>
        </SectionContainer>

        <div className="w-full h-125 relative z-0">
          <ContactMap
            latitude={parseFloat(siteSettings.geoLatitude || "46.2059")}
            longitude={parseFloat(siteSettings.geoLongitude || "5.2255")}
            address={mapAddress}
          />
        </div>
      </div>
    </PageMainWrapper>
  );
}
