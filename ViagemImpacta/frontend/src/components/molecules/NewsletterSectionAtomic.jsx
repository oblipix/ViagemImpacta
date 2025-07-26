// src/components/molecules/NewsletterSectionAtomic.jsx
import React from 'react';
import NewsletterForm from './NewsletterForm';

function NewsletterSectionAtomic() {
    return (
        <section className="NewsLetterSection text-blue-900 py-16 px-6 shadow-lg">
            <div className="container mx-auto text-center max-w-full">
                <h2 className="text-2xl font-bold mb-4">Receba Nossas Melhores Ofertas!</h2>
                <p className="text-1xl mb-8 opacity-90 max-w-2xl mx-auto">
                    Assine nossa newsletter e seja o primeiro a saber sobre promoções exclusivas, novos destinos e dicas de viagem imperdíveis.
                </p>
                <NewsletterForm />
            </div>
        </section>
    );
}

export default NewsletterSectionAtomic;
