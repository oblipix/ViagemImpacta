/* eslint-disable no-unused-vars */
import React from 'react';
import { Text, Container, Image, Card } from './atoms';
import './InstitutionalPageAtomic.css';

import devPhoto1 from '../assets/images/team/carol.png';
import devPhoto2 from '../assets/images/team/maxi.png';
import devPhoto3 from '../assets/images/team/marcelo.png';
import devPhoto4 from '../assets/images/team/matheusm.png';
import devPhoto5 from '../assets/images/team/matheusl.png';
import devPhoto6 from '../assets/images/team/poli.png';
import devPhoto7 from '../assets/images/team/rodrigo.png';

const teamMembers = [
  { name: 'Maria Carolina', photo: devPhoto1 },
  { name: 'Maximus Burgos', photo: devPhoto2 },
  { name: 'Marcelo Gonçalves', photo: devPhoto3 },
  { name: 'Matheus Maia', photo: devPhoto4 },
  { name: 'Matheus Lustosa', photo: devPhoto5 },
  { name: 'Poliana Brandão', photo: devPhoto6 },
  { name: 'Rodrigo Melo', photo: devPhoto7 },
];

function InstitutionalPageAtomic() {
  return (
    <section id="institutional-section" className="bg-white py-12 px-6 min-h-screen">
      <Container className="mx-auto max-w-4xl">
        <Text 
          as="h1" 
          className="text-4xl font-extrabold text-blue-800 text-center mb-10"
        >
          Sobre a Tripz: Nossa Jornada
        </Text>

        {/* História */}
        <Card className="mb-12 p-6 bg-gray-50 rounded-lg shadow-md">
          <Text 
            as="h2" 
            className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2"
          >
            Nossa História
          </Text>
          <Text className="text-lg text-gray-700 leading-relaxed">
            Nascemos do sonho e do talento de uma equipe de desenvolvedores Full Stack da Avanade. Como parte de um curso inovador da Impacta, promovido pela própria Avanade, mergulhamos no universo da tecnologia com um objetivo claro: transcender o aprendizado teórico e criar algo que realmente gerasse impacto. Foi nesse ambiente de constante desafio e colaboração que a Tripz ganhou vida. Mais do que um projeto de curso, é a materialização do nosso compromisso com a excelência e a paixão por conectar pessoas a experiências inesquecíveis. Cada linha de código em C# e React foi escrita com a visão de construir uma plataforma intuitiva, robusta e que refletisse o cuidado com cada detalhe da jornada do viajante. A Tripz é o legado de um grupo que, impulsionado pela Avanade, transformou conhecimento em inovação e paixão em um portal para o mundo.
          </Text>
        </Card>

        {/* Missão, Visão, Valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 bg-gray-50 rounded-lg shadow-md">
            <Text 
              as="h3" 
              className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-blue-200 pb-1"
            >
              Missão
            </Text>
            <Text className="text-md text-gray-700">
              Conectar pessoas a destinos incríveis, oferecendo experiências de viagem inesquecíveis através de uma plataforma intuitiva, segura e personalizada.
            </Text>
          </Card>
          
          <Card className="p-6 bg-gray-50 rounded-lg shadow-md">
            <Text 
              as="h3" 
              className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-blue-200 pb-1"
            >
              Visão
            </Text>
            <Text className="text-md text-gray-700">
              Ser a principal escolha para viajantes que buscam praticidade e inspiração, reconhecida pela inovação tecnológica e pelo impacto positivo nas jornadas de cada cliente.
            </Text>
          </Card>
          
          <Card className="p-6 bg-gray-50 rounded-lg shadow-md">
            <Text 
              as="h3" 
              className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-blue-200 pb-1"
            >
              Valores
            </Text>
            <ul className="list-disc list-inside text-md text-gray-700">
              <li>
                <Text as="span" className="font-bold">Inovação:</Text>
                <Text as="span"> Buscar constantemente soluções criativas e tecnológicas.</Text>
              </li>
              <li>
                <Text as="span" className="font-bold">Paixão:</Text>
                <Text as="span"> Amar o que fazemos e o impacto que geramos.</Text>
              </li>
              <li>
                <Text as="span" className="font-bold">Integridade:</Text>
                <Text as="span"> Agir com honestidade e transparência.</Text>
              </li>
              <li>
                <Text as="span" className="font-bold">Colaboração:</Text>
                <Text as="span"> Acreditar no poder do trabalho em equipe.</Text>
              </li>
              <li>
                <Text as="span" className="font-bold">Excelência:</Text>
                <Text as="span"> Entregar sempre o melhor em cada detalhe.</Text>
              </li>
            </ul>
          </Card>
        </div>

        {/* Seção dos Criadores */}
        <Card className="mb-12 p-6 bg-blue-50 rounded-lg shadow-md">
          <Text 
            as="h2" 
            className="text-3xl font-bold text-blue-800 text-center mb-6"
          >
            Nossos Criadores
          </Text>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg shadow-lg institutional-card">
                <Image
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale transition-all duration-300 hover:grayscale-0 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white text-center py-2 px-4">
                  <Text className="member-name text-white">
                    {member.name}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Seção adicional: Tecnologias utilizadas */}
        <Card className="mb-12 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-md">
          <Text 
            as="h2" 
            className="text-3xl font-bold text-gray-800 text-center mb-6"
          >
            Tecnologias que Utilizamos
          </Text>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                <Text className="text-white font-bold text-xl">C#</Text>
              </div>
              <Text className="text-sm font-medium text-gray-700">ASP.NET Core</Text>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mb-2">
                <Text className="text-white font-bold text-xl">⚛</Text>
              </div>
              <Text className="text-sm font-medium text-gray-700">React</Text>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mb-2">
                <Text className="text-white font-bold text-xl">TW</Text>
              </div>
              <Text className="text-sm font-medium text-gray-700">Tailwind CSS</Text>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-2">
                <Text className="text-white font-bold text-xl">SQL</Text>
              </div>
              <Text className="text-sm font-medium text-gray-700">SQL Server</Text>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}

export default InstitutionalPageAtomic;
