// 🧬 SECTION - NewsletterSectionAtomic (Idêntica ao legacy)
// Seção de newsletter - PARIDADE TOTAL com NewsletterSection

import React, { useState } from 'react';
import { Text, Container, Button, Input, FormGroup } from '../atoms';

const NewsletterSectionAtomic = ({ 
    title = "Receba Nossas Melhores Ofertas!",
    subtitle = "Assine nossa newsletter e seja o primeiro a saber sobre promoções exclusivas, novos destinos e dicas de viagem imperdíveis.",
    placeholder = "Seu melhor e-mail aqui...",
    submitText = "Assinar Agora",
    submittingText = "Enviando...",
    successMessage = "Obrigado por se inscrever! Em breve você receberá nossas novidades.",
    errorMessage = "Por favor, insira um e-mail válido.",
    networkErrorMessage = "Ocorreu um erro. Tente novamente.",
    onSubscribe,
    id,
    className = "",
    ...props 
}) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage(''); // Limpa mensagens anteriores
        setIsSubmitting(true);

        try {
            // Se há uma função personalizada de inscrição
            if (onSubscribe) {
                await onSubscribe(email);
                setMessage(successMessage);
                setEmail(''); // Limpa o campo de e-mail
            } else {
                // Simula uma chamada de API (comportamento idêntico ao legacy)
                await new Promise(resolve => setTimeout(resolve, 1500)); // Simula delay de rede
                if (email.includes('@') && email.includes('.')) {
                    setMessage(successMessage);
                    setEmail(''); // Limpa o campo de e-mail
                } else {
                    setMessage(errorMessage);
                }
            }
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            setMessage(networkErrorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section 
            id={id} 
            className={`NewsLetterSection text-blue-900 py-16 px-6 shadow-lg ${className}`} 
            style={{
                backgroundImage: 'linear-gradient(to right, #c9f0fdb4, #f9f3f3cf)',
                alignItems: 'center',
                textAlign: 'center'
            }}
            {...props}
        >
            <Container className="text-center max-w-full">
                <Text variant="h2" className="text-2xl font-bold mb-4">
                    {title}
                </Text>
                <Text variant="body" className="text-1xl mb-8 opacity-90 max-w-2xl mx-auto">
                    {subtitle}
                </Text>
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
                    <FormGroup className="flex-grow">
                        <Input
                            type="email"
                            placeholder={placeholder}
                            className="flex-grow p-3 rounded-lg border-2 border-white focus:outline-none focus:border-blue-300 bg-white bg-opacity-20 text-gray-800 placeholder-white"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <Button
                        type="submit"
                        className="event-submit bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        disabled={isSubmitting}
                        variant="primary"
                    >
                        {isSubmitting ? submittingText : submitText}
                    </Button>
                </form>
                {message && (
                    <p className={`mt-4 text-sm font-medium ${message.includes('Obrigado') ? 'text-green-200' : 'text-red-200'}`}>
                        {message}
                    </p>
                )}
            </Container>
        </section>
    );
};

export default NewsletterSectionAtomic;
