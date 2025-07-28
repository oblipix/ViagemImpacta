// 🧬 SECTION - EventBlogSectionAtomic (Idêntica ao legacy)
// Seção de eventos especiais - PARIDADE TOTAL com EventBlogSection

import React from 'react';
import { Text, Container, Button, Image } from '../atoms';

// Imagens dos eventos (importadas do legacy)
import ImagePascoaBH from '../../assets/images/pascoaBH.png';
import ImageNatalRS from '../../assets/images/natal1RS.png';
import ImageAnoNovoRJ from '../../assets/images/anonovoRJ.png';
import ImageCarnavelPe from '../../assets/images/carnavalPE.png';
import ImageDiasdosNamorados from '../../assets/images/diadosnamorados1RS.png';

const EventBlogSectionAtomic = ({ 
    onOpenReservationForm,
    title = "Nossos Eventos Especiais",
    subtitle = "Explore as datas mais celebradas do ano conosco! Preparamos experiências exclusivas para você e sua família.",
    buttonText = "Quero Reservar para um Evento!",
    id,
    className = "",
    events,
    ...props 
}) => {
    
    // Dados de eventos IDÊNTICOS ao legacy
    const defaultEventData = [
        {
            id: 201,
            title: 'Natal Mágico na Serra Gaúcha',
            description: 'Celebre o Natal com a magia e o encanto das luzes e decorações de Gramado e Canela. Um destino imperdível para famílias e casais em busca de uma experiência natalina inesquecível. Desfrute de desfiles temáticos, shows de luzes e a culinária local que transforma a festa em um verdadeiro deleite.',
            imageUrl: ImageNatalRS, 
            date: '24/12/2025 - 26/12/2025',
        },
        {
            id: 202,
            title: 'Réveillon em Copacabana',
            description: 'Comece o ano novo com o espetáculo dos fogos na praia mais famosa do Brasil. Uma celebração vibrante com shows musicais e a energia contagiante de milhões de pessoas. Viva a virada em um dos cenários mais icônicos do mundo, com vistas deslumbrantes do show pirotécnico sobre o mar.',
            imageUrl: ImageAnoNovoRJ,
            date: '30/12/2025 - 01/01/2026',
        },
        {
            id: 203,
            title: 'Carnaval no Recife',
            description: 'Viva a energia contagiante do maior espetáculo da Terra com o Galo da madrugada e blocos de rua por toda a cidade. Uma festa de cores, música e alegria que atrai foliões de todas as partes do mundo. Prepare-se para dias de pura diversão e tradição.',
            imageUrl: ImageCarnavelPe,
            date: 'Fevereiro/2026',
        },
        {
            id: 204,
            title: 'Páscoa Encantada em Belo Horizonte',
            description: 'Desfrute da elegância e do conforto da nossa Páscoa no coração de Belo Horizonte. Atividades especiais para toda a família, incluindo caça aos ovos em nossos espaços clássicos, decoração temática sofisticada e um ambiente acolhedor que celebra a tradição. Ideal para quem busca momentos especiais e inesquecíveis na cidade.',
            imageUrl: ImagePascoaBH,
            date: 'Abril/2026',
        },
        {
            id: 205,
            title: 'Dia dos Namorados Romântico na Serra Gaúcha',
            description: 'Uma fuga romântica para celebrar o amor nos cenários deslumbrantes da Serra Gaúcha. Desfrute de jantares à luz de velas em restaurantes charmosos, passeios pitorescos entre vinhedos e a elegância das cidades serranas. Crie memórias inesquecíveis ao lado de quem você ama, explorando Gramado, Canela e paisagens de tirar o fôlego.',
            imageUrl: ImageDiasdosNamorados,
            date: '12/06/2026',
        },
    ];

    const displayEvents = events || defaultEventData;

    return (
        <section id={id} className={`py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 ${className}`} {...props}>
            <Container>
                <Text variant="h2" className="text-4xl font-extrabold text-gray-900 text-center mb-10">
                    {title}
                </Text>
                <Text variant="body" className="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
                    {subtitle}
                </Text>

                <div className="space-y-16"> {/* Espaçamento entre os blocos de evento - IDÊNTICO ao legacy */}
                    {displayEvents.map((event, index) => (
                        <div
                            key={event.id}
                            className={`flex flex-col md:flex-row items-center gap-8 ${
                                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                            } bg-white rounded-lg shadow-lg p-6`}
                        >
                            <div className="md:w-1/2 flex-shrink-0">
                                <Image
                                    src={event.imageUrl}
                                    alt={event.title}
                                    className="w-full h-auto object-cover rounded-md shadow-md"
                                />
                            </div>
                            <div className="md:w-1/2 flex flex-col justify-center text-center md:text-left">
                                <Text variant="h3" className="text-3xl font-bold text-gray-800 mb-3">
                                    {event.title}
                                </Text>
                                <Text variant="body" className="text-purple-600 font-semibold mb-4">
                                    {event.date}
                                </Text>
                                <Text variant="body" className="text-gray-700 leading-relaxed mb-6">
                                    {event.description}
                                </Text>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <Button
                        onClick={onOpenReservationForm}
                        variant="primary"
                        className="px-8 py-4 bg-purple-600 text-white text-xl font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105 reservation-button"
                    >
                        {buttonText}
                    </Button>
                </div>
            </Container>
        </section>
    );
};

export default EventBlogSectionAtomic;
