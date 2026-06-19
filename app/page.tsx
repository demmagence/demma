'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormLoading(true);
    setFormError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setFormSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-background font-body-lg min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="bg-background shadow-sm sticky top-0 z-50 w-full px-margin-mobile md:px-margin-desktop py-4 mx-auto border-b border-surface-container-low transition-all duration-300">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center w-full">
          <div className="flex items-center gap-gutter">
            <a className="font-title-lg text-title-lg font-bold text-primary flex items-center gap-2" href="#">
              <div className="h-10 w-10 flex items-center justify-center overflow-hidden rounded-md">
                <Image 
                  src="/images/logo.png" 
                  alt="Demma Intelligence Logo" 
                  width={40}
                  height={40}
                  className="h-full w-full object-contain" 
                />
              </div>
              Demma Intelligence
            </a>
          </div>
          <div className="flex items-center gap-base">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu" 
              className="md:hidden p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors"
            >
              <span className="material-symbols-outlined notranslate select-none" translate="no">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
          <nav className="hidden md:flex items-center gap-base">
            <a className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 px-4 py-2 rounded-full" href="#projects">Projects</a>
            <a className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 px-4 py-2 rounded-full" href="#teams">Teams</a>
            <a className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 px-4 py-2 rounded-full" href="#contact">Contact</a>
          </nav>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-surface-container-low py-4 px-margin-mobile shadow-md flex flex-col gap-2 transition-all duration-300 animate-in slide-in-from-top-4">
            <a 
              onClick={() => setMobileMenuOpen(false)}
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 px-4 py-3 rounded-xl block text-left" 
              href="#projects"
            >
              Projects
            </a>
            <a 
              onClick={() => setMobileMenuOpen(false)}
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 px-4 py-3 rounded-xl block text-left" 
              href="#teams"
            >
              Teams
            </a>
            <a 
              onClick={() => setMobileMenuOpen(false)}
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 px-4 py-3 rounded-xl block text-left" 
              href="#contact"
            >
              Contact
            </a>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[calc(100vh-64px)] flex items-center px-margin-mobile md:px-margin-desktop overflow-hidden bg-gradient-to-b from-surface-bright to-background">
          <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-gutter items-center relative z-10 w-full py-12">
            <div className="space-y-6 max-w-2xl">
              <h1 className="font-display-lg text-display-lg text-on-surface font-extrabold tracking-tight leading-tight">
                Crafting intelligent <br className="hidden md:block" />solutions with a <span className="text-primary">human touch.</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl text-lg leading-relaxed">
                We build AI-driven platforms that prioritize collaboration, clarity, and positive impact. Empowering teams to write better code and solve complex problems seamlessly.
              </p>
              <div className="pt-6 flex flex-wrap gap-4">
                <a 
                  href="https://github.com/orgs/demmagence/repositories" 
                  className="bg-primary text-on-primary font-label-lg text-label-lg px-8 py-4 rounded-full hover:bg-primary-container transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 w-60"
                >
                  Explore Projects
                  <span className="material-symbols-outlined notranslate" translate="no">arrow_forward</span>
                </a>
                <a 
                  href="https://github.com/demmagence" 
                  rel="noopener noreferrer" 
                  className="bg-surface-container text-on-surface font-label-lg text-label-lg px-8 py-4 rounded-full hover:bg-surface-container-high transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 w-60"
                >
                  View on GitHub
                  <span className="material-symbols-outlined notranslate" translate="no">code</span>
                </a>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px] flex justify-center items-center">
              <div className="absolute inset-0 bg-secondary-container/10 rounded-full blur-3xl animate-pulse"></div>
              <Image 
                alt="Demma Intelligence Logo" 
                className="relative z-10 w-full max-w-md object-contain drop-shadow-2xl" 
                src="/images/logo.png" 
                width={448}
                height={448}
                priority
              />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="min-h-[calc(100vh-64px)] flex items-center px-margin-mobile md:px-margin-desktop bg-surface-container-lowest relative scroll-mt-16" id="projects">
          <div className="max-w-[1440px] mx-auto w-full py-12">
            <div className="text-center mb-16">
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold mb-4">Our Projects</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Open-source initiatives designed to foster innovation and learning.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-gutter max-w-6xl mx-auto">
              {/* Project Card 1 - CBT App */}
              <a href="https://github.com/demmagence/cbt-app" rel="noopener noreferrer"
                className="bg-surface rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <div className="w-12 h-12 bg-primary-container/20 rounded-xl flex items-center justify-center mb-6 p-2">
                  <Image
                    src="/images/cbt.png"
                    alt="CBT App Logo"
                    width={48}
                    height={48}
                    className="h-full w-full object-contain"
                  />
                </div>
                <h3 className="font-title-lg text-title-lg font-bold text-on-surface mb-3">CBT App</h3>
                <p className="font-body-md text-body-md text-on-surface-variant flex-grow mb-3 line-clamp-3">
                  A comprehensive computer-based testing application built with Dart. Designed for robust performance and scalable assessments.
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" alt="Dart" className="w-4 h-4" /> Dart
                  </span>
                </div>
              </a>
              {/* Project Card 2 - Demma */}
              <a href="https://github.com/demmagence/demma" rel="noopener noreferrer"
                className="bg-surface rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <div className="w-12 h-12 bg-secondary-container/20 rounded-xl flex items-center justify-center mb-6 p-2">
                  <Image
                    src="/images/robot.png"
                    alt="Demma Intelligence Web Logo"
                    width={48}
                    height={48}
                    className="h-full w-full object-contain"
                  />
                </div>
                <h3 className="font-title-lg text-title-lg font-bold text-on-surface mb-3">Demma</h3>
                <p className="font-body-md text-body-md text-on-surface-variant flex-grow mb-3 line-clamp-3">
                  The official home for our open-source initiatives. A modern, responsive web presence built with TypeScript and advanced UI patterns.
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" className="w-4 h-4" /> TypeScript
                  </span>
                </div>
              </a>
              {/* Project Card 3 - GlowMatch */}
              <a href="https://github.com/demmagence/glowmatch" rel="noopener noreferrer"
                className="bg-surface rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <div className="w-12 h-12 bg-primary-container/20 rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined notranslate select-none text-primary" translate="no">spa</span>
                </div>
                <h3 className="font-title-lg text-title-lg font-bold text-on-surface mb-3">GlowMatch</h3>
                <p className="font-body-md text-body-md text-on-surface-variant flex-grow mb-3 line-clamp-3">
                  An intelligent beauty and skincare recommendation platform that matches users with personalized product suggestions using AI.
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span> Flutter
                  </span>
                </div>
              </a>
              {/* Project Card 4 - Solvera */}
              <a href="https://github.com/demmagence/solvera" rel="noopener noreferrer"
                className="bg-surface rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <div className="w-12 h-12 bg-secondary-container/20 rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined notranslate select-none text-secondary" translate="no">cases</span>
                </div>
                <h3 className="font-title-lg text-title-lg font-bold text-on-surface mb-3">Solvera</h3>
                <p className="font-body-md text-body-md text-on-surface-variant flex-grow mb-3 line-clamp-3">
                  A TypeScript-powered problem-solving platform that streamlines workflows and helps teams tackle complex challenges collaboratively.
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span> TypeScript
                  </span>
                </div>
              </a>
              {/* Project Card 5 - OmniAgent Studio */}
              <a href="https://github.com/demmagence/omniagent-studio" rel="noopener noreferrer"
                className="bg-surface rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <div className="w-12 h-12 bg-primary-container/20 rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined notranslate select-none text-primary" translate="no">account_tree</span>
                </div>
                <h3 className="font-title-lg text-title-lg font-bold text-on-surface mb-3">OmniAgent Studio</h3>
                <p className="font-body-md text-body-md text-on-surface-variant flex-grow mb-3 line-clamp-3">
                  A visual studio for building, testing, and deploying multi-agent AI workflows. Designed for developers who want full control over agent orchestration.
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span> TypeScript
                  </span>
                </div>
              </a>
              {/* Project Card 6 - Kassa */}
              <a href="https://github.com/demmagence/kassa" rel="noopener noreferrer"
                className="bg-surface rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <div className="w-12 h-12 bg-secondary-container/20 rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined notranslate select-none text-secondary" translate="no">payments</span>
                </div>
                <h3 className="font-title-lg text-title-lg font-bold text-on-surface mb-3">Kassa</h3>
                <p className="font-body-md text-body-md text-on-surface-variant flex-grow mb-3 line-clamp-3">
                  A modern point-of-sale and cashier management system supporting multi-language workflows and real-time transaction processing.
                </p>
                <div className="flex items-center gap-2 mt-auto">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span> TypeScript
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Python
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="min-h-[calc(100vh-64px)] flex items-center px-margin-mobile md:px-margin-desktop bg-surface-container-low scroll-mt-16" id="teams">
          <div className="max-w-[1440px] mx-auto w-full py-12">
            <div className="text-center mb-16">
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold mb-4">Meet the Team</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">The minds behind the intelligence.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-gutter max-w-4xl mx-auto">
              {/* Team Member 1 */}
              <a 
                href="https://github.com/wibisanabama" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center text-center p-6 group cursor-pointer"
              >
                <div className="w-32 h-32 rounded-full bg-surface-container-highest mb-6 overflow-hidden border-4 border-surface shadow-md relative transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                  <Image 
                    alt="Bama â€” GitHub Profile" 
                    className="w-full h-full object-cover" 
                    src="/images/team-bama.png" 
                    width={128}
                    height={128}
                  />
                </div>
                <h4 className="font-title-lg text-title-lg text-on-surface font-bold">Bama</h4>
              </a>
              {/* Team Member 2 */}
              <a 
                href="https://github.com/Derylfabiensyah" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center text-center p-6 group cursor-pointer"
              >
                <div className="w-32 h-32 rounded-full bg-surface-container-highest mb-6 overflow-hidden border-4 border-surface shadow-md relative transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                  <Image 
                    alt="Deryl â€” GitHub Profile" 
                    className="w-full h-full object-cover" 
                    src="/images/team-deryl.png" 
                    width={128}
                    height={128}
                  />
                </div>
                <h4 className="font-title-lg text-title-lg text-on-surface font-bold">Deryl</h4>
              </a>
              {/* Team Member 3 */}
              <a 
                href="https://github.com/ALIFKA-HUB" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center text-center p-6 group cursor-pointer"
              >
                <div className="w-32 h-32 rounded-full bg-surface-container-highest mb-6 overflow-hidden border-4 border-surface shadow-md relative transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                  <Image 
                    alt="Alifka â€” GitHub Profile" 
                    className="w-full h-full object-cover" 
                    src="/images/team-alifka.png" 
                    width={128}
                    height={128}
                  />
                </div>
                <h4 className="font-title-lg text-title-lg text-on-surface font-bold">Alifka</h4>
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="min-h-[calc(100vh-64px)] flex items-center px-margin-mobile md:px-margin-desktop bg-surface-container-lowest scroll-mt-16" id="contact">
          <div className="max-w-[1440px] mx-auto flex justify-center w-full py-12">
            <div className="w-full max-w-2xl bg-surface p-8 md:p-12 rounded-3xl shadow-sm relative overflow-hidden">
              <div className="text-center mb-10">
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold mb-3">Get in Touch</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">Have a project in mind or want to collaborate? Send us a message.</p>
              </div>

              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-2xl flex flex-col items-center gap-3 animate-in fade-in duration-300">
                  <span className="material-symbols-outlined notranslate text-green-600 text-4xl select-none" data-weight="fill" translate="no">check_circle</span>
                  <h4 className="font-title-lg text-title-lg font-bold text-green-900">Message Sent!</h4>
                  <p className="font-body-md text-center">Thank you for reaching out. We will get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-label-lg text-label-lg text-on-surface block" htmlFor="name">Name</label>
                      <input 
                        className="w-full bg-surface-container-lowest border border-outline rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200" 
                        id="name" 
                        name="name" 
                        placeholder="Jane Doe" 
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-label-lg text-label-lg text-on-surface block" htmlFor="email">Email</label>
                      <input 
                        className="w-full bg-surface-container-lowest border border-outline rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200" 
                        id="email" 
                        name="email" 
                        placeholder="jane@example.com" 
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-lg text-label-lg text-on-surface block" htmlFor="message">Message</label>
                    <textarea 
                      className="w-full bg-surface-container-lowest border border-outline rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 resize-none" 
                      id="message" 
                      name="message" 
                      placeholder="How can we help you?" 
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  {formError && (
                    <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl flex items-center gap-3">
                      <span className="material-symbols-outlined notranslate text-red-600 select-none" translate="no">error</span>
                      <p className="font-body-md text-sm">{formError}</p>
                    </div>
                  )}
                  <button 
                    className="w-full bg-primary text-on-primary font-label-lg text-label-lg px-8 py-4 rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-colors duration-300 shadow-md active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100" 
                    type="submit"
                    disabled={formLoading}
                  >
                    {formLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <span className="material-symbols-outlined notranslate text-[18px]" translate="no">send</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-surface-container-highest dark:bg-inverse-surface w-full py-12 px-margin-mobile md:px-margin-desktop flex flex-col items-center gap-gutter">
        <div className="flex flex-col items-center gap-4">
          <span className="font-title-lg text-title-lg font-black text-primary flex items-center">
            <Image 
              src="/images/logo.png" 
              alt="Demma Intelligence Logo" 
              width={32}
              height={32}
              className="h-8 w-8 object-contain inline-block mr-2" 
            />
            Demma Intelligence
          </span>
          <span className="font-body-md text-body-md text-[#49454F]">Â© 2026 Demma Intelligence. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
