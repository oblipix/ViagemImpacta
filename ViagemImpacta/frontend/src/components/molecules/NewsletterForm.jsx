// src/components/molecules/NewsletterForm.jsx
import React, { useState } from 'react';
import EmailInput from '../atoms/EmailInput';
import SubmitButton from '../atoms/SubmitButton';
import StatusMessage from '../atoms/StatusMessage';

function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage(''); // Limpa mensagens anteriores
        setIsSubmitting(true);

        // Simula uma chamada de API
        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simula delay de rede
            if (email.includes('@') && email.includes('.')) {
                setMessage('Obrigado por se inscrever! Em breve você receberá nossas novidades.');
                setEmail(''); // Limpa o campo de e-mail
            } else {
                setMessage('Por favor, insira um e-mail válido.');
            }
        } catch {
            setMessage('Ocorreu um erro. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
                <EmailInput
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu melhor e-mail aqui..."
                    required
                />
                <SubmitButton isSubmitting={isSubmitting}>
                    Assinar Agora
                </SubmitButton>
            </form>
            <StatusMessage message={message} />
        </>
    );
}

export default NewsletterForm;
