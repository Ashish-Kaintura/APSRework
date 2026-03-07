import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
const API = "http://localhost:5000/api/services";
const IMAGE_BASE_URL = "http://localhost:5000/"; // Adjust if your static folder is served differently

export default function ServicePreviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await axios.get(`${API}/${id}`);
        setService(data);
      } catch (err) {
        console.error("Failed to fetch service preview", err);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 text-xl font-bold text-center">
        Loading Preview...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="p-10 text-xl font-bold text-center text-red-600">
        Service not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8 text-gray-800">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="text-red-600 font-medium mb-2 hover:underline"
          >
            &larr; Back to Services
          </button>
          <h1 className="text-4xl font-bold">{service.title}</h1>
          <div className="flex gap-4 mt-2 text-sm text-gray-500">
            <span>
              Status: <strong className="uppercase">{service.status}</strong>
            </span>
            <span>
              Order: <strong>{service.order}</strong>
            </span>
            <span>
              Slug: <strong>{service.slug}</strong>
            </span>
          </div>
        </div>
        <button
          onClick={() => navigate(`/editService/${service._id}`)}
          className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700"
        >
          Edit Service
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Feature Image */}
          {service.image && (
            <div className="rounded-xl overflow-hidden shadow-md border">
              <img
                src={`${IMAGE_BASE_URL}${service.image}`}
                alt={service.title}
                className="w-full h-auto object-cover max-h-[400px]"
              />
            </div>
          )}

          {/* BANNER SECTION */}
          {service.banner &&
            (service.banner.bannerTitle ||
              service.banner.shortDescription ||
              service.banner.bannerImage ||
              service.banner.portraitImage) && (
              <section className="bg-gray-50 p-6 rounded-xl border">
                <h2 className="text-sm font-bold text-red-600 uppercase mb-4">
                  Banner Section
                </h2>

                {/* Render Banner Images if they exist */}
                {(service.banner.bannerImage ||
                  service.banner.portraitImage) && (
                  <div className="flex gap-4 mb-6">
                    {service.banner.bannerImage && (
                      <div className="w-1/2">
                        <p className="text-xs text-gray-500 mb-1 font-bold">
                          Banner Image
                        </p>
                        <img
                          src={`${IMAGE_BASE_URL}${service.banner.bannerImage}`}
                          alt="Banner"
                          className="w-full h-40 object-cover rounded border shadow-sm"
                        />
                      </div>
                    )}
                    {service.banner.portraitImage && (
                      <div className="w-1/2">
                        <p className="text-xs text-gray-500 mb-1 font-bold">
                          Portrait Image
                        </p>
                        <img
                          src={`${IMAGE_BASE_URL}${service.banner.portraitImage}`}
                          alt="Portrait"
                          className="w-full h-40 object-cover rounded border shadow-sm"
                        />
                      </div>
                    )}
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2">
                  {service.banner.bannerTitle}
                </h3>
                <p className="text-gray-600 italic mb-4">
                  {service.banner.bannerKeyword}
                </p>
                <p className="font-medium mb-2">
                  {service.banner.shortDescription}
                </p>
                <p className="whitespace-pre-wrap">
                  {service.banner.paragraph}
                </p>
              </section>
            )}

          {/* SHORT SUMMARY SECTION */}
          {service.shortSummary &&
            (service.shortSummary.title ||
              service.shortSummary.image1 ||
              service.shortSummary.image2) && (
              <section className="bg-gray-50 p-6 rounded-xl border overflow-scroll">
                <h2 className="text-sm font-bold text-red-600 uppercase mb-4">
                  Short Summary
                </h2>

                {/* Render Short Summary Images if they exist */}
                {(service.shortSummary.image1 ||
                  service.shortSummary.image2) && (
                  <div className="flex gap-4 mb-6">
                    {service.shortSummary.image1 && (
                      <div className="w-1/2">
                        <p className="text-xs text-gray-500 mb-1 font-bold">
                          Image 1
                        </p>
                        <img
                          src={`${IMAGE_BASE_URL}${service.shortSummary.image1}`}
                          alt="Summary 1"
                          className="w-full h-40 object-cover rounded border shadow-sm"
                        />
                      </div>
                    )}
                    {service.shortSummary.image2 && (
                      <div className="w-1/2">
                        <p className="text-xs text-gray-500 mb-1 font-bold">
                          Image 2
                        </p>
                        <img
                          src={`${IMAGE_BASE_URL}${service.shortSummary.image2}`}
                          alt="Summary 2"
                          className="w-full h-40 object-cover rounded border shadow-sm"
                        />
                      </div>
                    )}
                  </div>
                )}

                <h3 className="text-xl font-bold mb-4">
                  {service.shortSummary.title}
                </h3>
                <p className="mb-4">{service.shortSummary.paragraph1}</p>
                <p>{service.shortSummary.paragraph2}</p>
              </section>
            )}

          {/* SERVICES SECTION */}
          {service.servicesSection &&
            service.servicesSection.services?.length > 0 && (
              <section className="bg-gray-50 p-6 rounded-xl border overflow-scroll">
                <h2 className="text-sm font-bold text-red-600 uppercase mb-2">
                  Services List
                </h2>
                <h3 className="text-xl font-bold mb-2">
                  {service.servicesSection.title}
                </h3>
                <p className="mb-6 text-gray-600">
                  {service.servicesSection.shortSummary}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {service.servicesSection.services.map((item, idx) => {
                    const IconComponent =
                      FaIcons[item.icon] ||
                      SiIcons[item.icon] ||
                      GiIcons[item.icon] ||
                      MdIcons[item.icon];
                    return (
                      <div
                        key={idx}
                        className="p-4 bg-white border rounded shadow-sm flex items-center gap-3"
                      >
                        {IconComponent && (
                          <IconComponent className="text-red-600" size={40} />
                        )}
                        <span className="font-bold">{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

          {/* SPECIAL SERVICES SECTION */}
          {service.specialServicesSection &&
            service.specialServicesSection.services?.length > 0 && (
              <section className="bg-gray-50 p-6 rounded-xl border overflow-scroll">
                <h2 className="text-sm font-bold text-red-600 uppercase mb-2">
                  Special Services
                </h2>
                <h3 className="text-xl font-bold mb-6">
                  {service.specialServicesSection.title}
                </h3>
                <div className="space-y-4">
                  {service.specialServicesSection.services.map((item, idx) => {
                    const IconComponent =
                      FaIcons[item.icon] ||
                      SiIcons[item.icon] ||
                      GiIcons[item.icon] ||
                      MdIcons[item.icon];
                    return (
                      <div
                        key={idx}
                        className="p-4 bg-white border rounded shadow-sm"
                      >
                        <h4 className="font-bold flex items-center gap-2">
                          {IconComponent && (
                            <IconComponent className="text-red-600" size={40} />
                          )}
                          {item.title}
                        </h4>
                        <p className="text-gray-600 mt-2">{item.description}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

          {/* WHY US SECTION */}
          {service.whyUsSection && service.whyUsSection.points?.length > 0 && (
            <section className="bg-gray-50 p-6 rounded-xl border">
              <h2 className="text-sm font-bold text-red-600 uppercase mb-2">
                Why Us
              </h2>
              <h3 className="text-xl font-bold mb-2">
                {service.whyUsSection.title}
              </h3>
              <p className="mb-6 text-gray-600">
                {service.whyUsSection.summary}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.whyUsSection.points.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white border rounded shadow-sm"
                  >
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{item.summary}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAQ SECTION */}
          {service.faqSection && service.faqSection.faqs?.length > 0 && (
            <section className="bg-gray-50 p-6 rounded-xl border">
              <h2 className="text-sm font-bold text-red-600 uppercase mb-2">
                FAQ
              </h2>
              <h3 className="text-xl font-bold mb-6">
                {service.faqSection.title}
              </h3>
              <div className="space-y-4">
                {service.faqSection.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white border rounded shadow-sm"
                  >
                    <p className="font-bold mb-2">Q: {faq.question}</p>
                    <p className="text-gray-700">A: {faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN: SIDEBAR */}
        <div className="space-y-8">
          {/* CTA SECTION */}
          {service.ctaSection && service.ctaSection.title && (
            <section className="bg-red-600 text-white p-6 rounded-xl shadow-md">
              <h2 className="text-sm font-bold text-white uppercase mb-2">
                Call To Action
              </h2>
              <h3 className="text-2xl font-bold mb-2">
                {service.ctaSection.title}
              </h3>
              <p>{service.ctaSection.summary}</p>
            </section>
          )}

          {/* SEO DATA */}
          {service.seo && (
            <section className="bg-gray-50 p-6 rounded-xl border break-words">
              <h2 className="text-sm font-bold text-red-600 uppercase mb-4">
                SEO Details
              </h2>
              <div className="space-y-3 text-sm">
                <div>
                  <strong className="block text-gray-700">Meta Title:</strong>
                  <span>{service.seo.metaTitle || "-"}</span>
                </div>
                <div>
                  <strong className="block text-gray-700">
                    Meta Description:
                  </strong>
                  <span>{service.seo.metaDescription || "-"}</span>
                </div>
                <div>
                  <strong className="block text-gray-700">Keywords:</strong>
                  <span>{service.seo.metaKeywords || "-"}</span>
                </div>
                <div>
                  <strong className="block text-gray-700">Canonical:</strong>
                  <span className="text-green-600">
                    {service.seo.metaCanonical || "-"}
                  </span>
                </div>
                {service.seo.schemaMarkup && (
                  <div>
                    <strong className="block text-gray-700">
                      Schema JSON-LD:
                    </strong>
                    <pre className="bg-gray-800 text-green-400 p-2 rounded mt-1 overflow-x-auto text-xs">
                      {typeof service.seo.schemaMarkup === "string"
                        ? service.seo.schemaMarkup
                        : JSON.stringify(service.seo.schemaMarkup, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
