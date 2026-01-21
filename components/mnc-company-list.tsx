"use client"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

const companies = [
    { name: "TCS", url: "https://www.tcs.com/careers", domain: "tcs.com" },
    { name: "Infosys", url: "https://www.infosys.com/careers.html", domain: "infosys.com" },
    { name: "Wipro", url: "https://careers.wipro.com/", domain: "wipro.com" },
    { name: "HCLTech", url: "https://www.hcltech.com/careers", domain: "hcltech.com" },
    { name: "Tech Mahindra", url: "https://careers.techmahindra.com/", domain: "techmahindra.com" },
    { name: "Accenture", url: "https://www.accenture.com/in-en/careers", domain: "accenture.com" },
    { name: "Capgemini", url: "https://www.capgemini.com/in-en/careers/", domain: "capgemini.com" },
    { name: "Cognizant", url: "https://careers.cognizant.com/global/en", domain: "cognizant.com" },
    { name: "IBM India", url: "https://www.ibm.com/in-en/careers", domain: "ibm.com" },
    { name: "Microsoft", url: "https://careers.microsoft.com/v2/global/en/home.html", domain: "microsoft.com" },
    { name: "Google", url: "https://careers.google.com/", domain: "google.com" },
    { name: "Amazon", url: "https://www.amazon.jobs/en", domain: "amazon.com" },
    { name: "Deloitte", url: "https://www2.deloitte.com/in/en/pages/careers/topics/careers.html", domain: "deloitte.com" },
    { name: "EY", url: "https://www.ey.com/en_in/careers", domain: "ey.com" },
    { name: "PwC India", url: "https://www.pwc.in/careers.html", domain: "pwc.in" },
    { name: "KPMG India", url: "https://home.kpmg/in/en/home/careers.html", domain: "kpmg.com" },
    { name: "Oracle", url: "https://www.oracle.com/in/careers/", domain: "oracle.com" },
    { name: "SAP Labs", url: "https://www.sap.com/india/about/careers.html", domain: "sap.com" },
    { name: "Siemens", url: "https://www.siemens.com/in/en/company/jobs-careers.html", domain: "siemens.com" },
    { name: "Bosch India", url: "https://www.bosch.in/careers/", domain: "bosch.in" },
    { name: "Intel", url: "https://www.intel.com/content/www/us/en/jobs/locations/india.html", domain: "intel.com" },
    { name: "Qualcomm", url: "https://www.qualcomm.com/company/careers", domain: "qualcomm.com" },
    { name: "Dell", url: "https://jobs.dell.com/", domain: "dell.com" },
    { name: "HP", url: "https://www.hp.com/in-en/jobs.html", domain: "hp.com" },
    { name: "Cisco", url: "https://www.cisco.com/c/en_in/about/careers.html", domain: "cisco.com" },
    { name: "Adobe", url: "https://www.adobe.com/careers.html", domain: "adobe.com" },
    { name: "Uber", url: "https://www.uber.com/us/en/careers/", domain: "uber.com" },
    { name: "Flipkart", url: "https://www.flipkartcareers.com/", domain: "flipkart.com" },
    { name: "PayPal", url: "https://www.paypal.com/us/webapps/mpp/jobs", domain: "paypal.com" },
    { name: "J.P. Morgan", url: "https://careers.jpmorgan.com/global/en/home", domain: "jpmorganchase.com" },
]

const CompanyLogo = ({ company }: { company: { name: string; domain: string } }) => {
    const [error, setError] = useState(false)

    // Using Google Favicon API as it's more reliable for "official" brand icons than Clearbit in many environments
    // Requesting size 128 for decent quality
    const logoUrl = `https://www.google.com/s2/favicons?domain=${company.domain}&sz=128`

    return (
        <div className="w-20 h-20 mb-4 relative flex items-center justify-center rounded-full p-4 transition-transform duration-500 hover:rotate-y-12 preserve-3d group-hover:scale-110"
            style={{
                background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
                boxShadow: "5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff, inset 2px 2px 5px rgba(255,255,255,0.8)"
            }}
        >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/80 to-transparent opacity-50 pointer-events-none" />

            {!error ? (
                <img
                    src={logoUrl}
                    alt={`${company.name} logo`}
                    className="object-contain w-full h-full drop-shadow-md transform-gpu transition-transform hover:scale-110"
                    onError={() => setError(true)}
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-primary/10 text-primary font-bold text-xl rounded-full">
                    {company.name.slice(0, 2).toUpperCase()}
                </div>
            )}
        </div>
    )
}

export function MncCompanyList() {
    return (
        <section className="py-24 bg-secondary/30">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-display text-primary">
                        Top 30 MNC Companies in India
                    </h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Direct official career links to the top employers hiring freshers and experienced professionals.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {companies.map((company, index) => (
                        <motion.div
                            key={company.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            viewport={{ once: true }}
                        >
                            <Link
                                href={company.url}
                                target="_blank"
                                className="group flex flex-col items-center justify-center p-6 bg-background rounded-xl shadow-sm border hover:shadow-md hover:border-primary/50 transition-all duration-300 h-full"
                            >
                                <CompanyLogo company={company} />
                                <h3 className="font-semibold text-sm text-center mb-2 group-hover:text-primary transition-colors">
                                    {company.name}
                                </h3>
                                <div className="flex items-center text-xs text-muted-foreground group-hover:text-primary/80">
                                    Visit Careers <ExternalLink className="w-3 h-3 ml-1" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
