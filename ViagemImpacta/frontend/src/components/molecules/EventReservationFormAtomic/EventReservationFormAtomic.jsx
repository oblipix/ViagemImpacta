import React, { useState } from 'react';
import { Button, Input, Select, Textarea, Modal, Alert, FormGroup } from '../../atoms';

// 🎯 MOLECULAR COMPONENT - Event Reservation Form Atomic
const EventReservationFormAtomic = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        preferredDate: '',
        eventType: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitSuccess(false);
        setSubmitError(false);

        // Simula uma requisição de API
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500)); // Simula delay de rede
            console.log('Dados do formulário enviados (Atomic):', formData);
            setSubmitSuccess(true);
            setFormData({ // Limpa o formulário após o sucesso
                name: '',
                email: '',
                phone: '',
                preferredDate: '',
                eventType: '',
                message: '',
            });
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            setSubmitError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        // Reset form state when closing
        setSubmitSuccess(false);
        setSubmitError(false);
        onClose();
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={handleClose}
            title="Formulário de Interesse em Evento"
            maxWidth="max-w-lg"
        >
            <p className="text-gray-600 mb-6 text-center">
                Preencha os campos abaixo e entraremos em contato para discutir sua reserva!
            </p>

            {/* Success Alert */}
            {submitSuccess && (
                <Alert variant="success" title="Sucesso!">
                    Seus dados foram enviados. Em breve entraremos em contato!
                </Alert>
            )}

            {/* Error Alert */}
            {submitError && (
                <Alert variant="error" title="Erro!">
                    Não foi possível enviar sua solicitação. Tente novamente mais tarde.
                </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nome Completo */}
                <FormGroup label="Nome Completo">
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Digite seu nome completo"
                    />
                </FormGroup>

                {/* E-mail */}
                <FormGroup label="E-mail">
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="seu@email.com"
                    />
                </FormGroup>

                {/* Telefone */}
                <FormGroup label="Telefone (com DDD)">
                    <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="(11) 99999-9999"
                    />
                </FormGroup>

                {/* Data de Interesse */}
                <FormGroup label="Data de Interesse">
                    <Input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                    />
                </FormGroup>

                {/* Tipo de Evento */}
                <FormGroup label="Qual Evento te Interessou?">
                    <Select
                        id="eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                    >
                        <option value="">Selecione um evento</option>
                        <option value="Natal Mágico na Serra Gaúcha">Natal Mágico na Serra Gaúcha</option>
                        <option value="Réveillon em Copacabana">Réveillon em Copacabana</option>
                        <option value="Carnaval no Recife">Carnaval no Recife</option>
                        <option value="Páscoa Encantada em Belo Horizonte">Páscoa Encantada em Belo Horizonte</option>
                        <option value="Dia dos Namorados Romântico na Serra Gaúcha">Dia dos Namorados Romântico na Serra Gaúcha</option>
                        <option value="Outro">Outro (especifique na mensagem)</option>
                    </Select>
                </FormGroup>

                {/* Mensagem */}
                <FormGroup label="Sua Mensagem / Detalhes Adicionais">
                    <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Conte-nos mais sobre suas preferências..."
                    />
                </FormGroup>

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="w-full py-3 text-lg"
                >
                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
                </Button>
            </form>
        </Modal>
    );
};

export default EventReservationFormAtomic;
