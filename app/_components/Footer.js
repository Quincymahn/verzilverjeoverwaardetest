"use client";

import { useState } from "react";
import {
  ArrowLongRightIcon,
  CheckIcon,
  PhoneIcon,
  ShieldCheckIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Modal from "./Modal";

// Modal content components
const AboutUsContent = ({ onClose }) => (
  <>
    <div className="space-y-4 mt-3 p-3 sm:p-6">
      <h2 className="font-bold text-[#194d90] text-xl sm:text-2xl">
        Wie zijn wij?
      </h2>
      <p className="text-gray-700 mb-6 sm:mb-10 text-sm sm:text-base">
        Wij zijn een gepassioneerd team van vastgoedexperts die u helpen bij het
        vinden van uw droomhuis. Met jaren ervaring in de markt bieden wij
        persoonlijke service en professioneel advies.
      </p>
      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-6 sm:gap-10 mb-6 sm:mb-10">
        <div>
          <h2 className="text-[#194d90] font-semibold text-lg sm:text-xl mb-3 sm:mb-4">
            Onze expertise
          </h2>
          <p className="text-gray-600 mb-2 text-sm sm:text-base">
            Bij Verzilverjeoverwaarde combineren we diepgaande marktkennis met
            een persoonlijke aanpak om u te helpen bij iedere stap van uw
            vastgoedtraject.
          </p>
          <p className="text-gray-600 text-sm sm:text-base">
            Of u nu op zoek bent naar uw eerste woning, wilt investeren in
            vastgoed, of advies nodig heeft over het verzilveren van uw
            overwaarde - wij staan voor u klaar.
          </p>
        </div>
        <div className="flex justify-center sm:block">
          <Image
            width={200}
            height={200}
            alt="Over ons foto"
            src="/img/kateryna-hliznitsova-vwaW6X3MHKA-unsplash.jpg"
            className="w-[80%] sm:w-[90%] rounded-xl"
          />
        </div>
      </div>
      <div className="border-l-4 sm:border-l-5 p-3 sm:p-4 px-4 sm:px-6 border-[#194d90] bg-blue-50/50 rounded-lg">
        <h2 className="mb-3 text-base sm:text-lg font-semibold text-[#194d90]">
          Onze kernwaarden
        </h2>
        <ul className="mb-4 sm:mb-5 space-y-1">
          <li className="list-disc ml-4 text-sm sm:text-base">
            <span className="text-black font-semibold">Integriteit </span>
            <span className="text-gray-600">
              - Eerlijkheid en transparantie in al onze transacties
            </span>
          </li>
          <li className="list-disc ml-4 text-sm sm:text-base">
            <span className="text-black font-semibold">Deskundigheid </span>
            <span className="text-gray-600">
              - Diepgaande kennis van de lokale vastgoedmarkt
            </span>
          </li>
          <li className="list-disc ml-4 text-sm sm:text-base">
            <span className="text-black font-semibold">
              Persoonlijke benadering{" "}
            </span>
            <span className="text-gray-600">
              - Elke klant krijgt aandacht op maat
            </span>
          </li>
          <li className="list-disc ml-4 text-sm sm:text-base">
            <span className="text-black font-semibold">Innovatie</span>
            <span className="text-gray-600">
              - Moderne technieken voor de beste resultaten
            </span>
          </li>
        </ul>
        <h3 className="mb-3 text-base sm:text-lg font-semibold text-[#194d90]">
          Waarom voor ons kiezen?
        </h3>
        <ul className="space-y-1">
          <li className="list-disc ml-4 text-sm sm:text-base">
            <span className="text-black font-semibold">
              Jarenlange ervaring{" "}
            </span>
            <span className="text-gray-600">
              in de Nederlandse vastgoedmarkt
            </span>
          </li>
          <li className="list-disc ml-4 text-sm sm:text-base">
            <span className="text-black font-semibold">
              Persoonlijke begeleiding{" "}
            </span>
            <span className="text-gray-600">
              afgestemd op uw specifieke wensen
            </span>
          </li>
          <li className="list-disc ml-4 text-sm sm:text-base">
            <span className="text-black font-semibold">
              Transparant proces{" "}
            </span>
            <span className="text-gray-600">met duidelijk communicatie</span>
          </li>
          <li className="list-disc ml-4 text-sm sm:text-base">
            <span className="text-black font-semibold">
              Innovatieve oplossingen{" "}
            </span>
            <span className="text-gray-600">
              voor moderne vastgoeduitdagingen
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div className="p-6 sm:p-10 rounded-bl-lg rounded-br-lg text-center bg-blue-50/50 mt-6 sm:mt-10">
      <h4 className="font-semibold mb-1 text-sm sm:text-base">
        Klaar om uw droomhuis te vinden?
      </h4>
      <p className="mb-4 sm:mb-5 text-sm sm:text-base">
        Neem vandaag nog contact met ons op voor een vrijblijvend gesprek
      </p>
      <a
        href="#"
        onClick={(e) => {
          onClose();
        }}
        className="px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base text-white bg-gradient-to-r from-primary-700 to-[#194d90] rounded-full font-semibold"
      >
        Vul het formulier in
      </a>
    </div>
  </>
);

const DisclaimerContent = () => (
  <div className="space-y-4 sm:space-y-6 p-3 sm:p-6">
    <div className="text-gray-600 text-sm sm:text-base/7 border-b border-gray-200 pb-4">
      <h2 className="text-2xl font-semibold text-black mb-4">
        Disclaimer Verzilverjeoverwaarde.nl
      </h2>
      <p>
        Deze disclaimer is van toepassing op de website
        <span className="font-semibold text-black">
          {" "}
          Verzilverjeoverwaarde.nl,{" "}
        </span>
        een handelsnaam van
        <span className="font-semibold text-black"> Qonsult B.V. </span>
        Door deze website te bezoeken en/of gebruik te maken van de informatie
        en diensten die hier worden aangeboden, ga je akkoord met de inhoud van
        deze disclaimer.
      </p>
    </div>

    <div className="text-gray-600 text-sm sm:text-base/7 border-b border-gray-200 pb-4">
      <h3 className="text-xl font-semibold text-black mb-4">
        Inhoud en aansprakelijkheid
      </h3>
      <p className="mb-4">
        Qonsult B.V. stelt de inhoud van Verzilverjeoverwaarde.nl met uiterste
        zorg samen en streeft ernaar deze actueel en correct te houden.
        Desondanks is het mogelijk dat informatie op deze website{" "}
        <span className="text-black font-semibold">onvolledig, </span>
        <span className="text-black font-semibold">
          verouderd of onjuist is.{" "}
        </span>
        De informatie op deze website, waaronder eventuele rentepercentages of
        productvoorwaarden, is indicatief en{" "}
        <span className="text-black font-semibold">geen bindend aanbod.</span>{" "}
        Het actuele rentepercentage en de voorwaarden worden altijd besproken
        tijdens een persoonlijk adviesgesprek en kunnen dagelijks wijzigen.
      </p>
      <p className="mb-2">
        Qonsult B.V. is
        <span className="font-semibold text-black"> niet aansprakelijk </span>
        voor directe of indirecte schade die voortvloeit uit:
      </p>
      <ul className="list-disc ml-5 mb-4">
        <li>Het gebruik van deze website</li>
        <li>het niet beschikbaar zijn van de website;</li>
        <li>
          onjuistheden of onvolledigheden op deze website of gekoppelde websites
          van derden.
        </li>
      </ul>
      <p>
        De inhoud wordt geleverd in de staat waarin deze zich bevindt,
        <span className="font-semibold text-black">
          {" "}
          zonder enige garantie{" "}
        </span>
        met betrekking tot geschiktheid, juistheid of bruikbaarheid voor
        specifieke doeleinden.
      </p>
    </div>

    <div className="text-gray-600 text-sm sm:text-base/7 border-b border-gray-200 pb-4">
      <h4 className="font-semibold text-black text-xl mb-4">
        Wijzigingen en beschikbaarheid
      </h4>
      <p className="mb-4">
        Qonsult B.V. behoudt zich het recht voor om{" "}
        <span className="text-black font-semibold">
          {" "}
          de inhoud of functionaliteit van deze website op elk moment te
          wijzigen, aan te vullen of beëindigen,{" "}
        </span>
        zonder voorafgaand kennisgeving. Ook kunnen wij{" "}
        <span className="font-semibold text-black">
          {" "}
          bezoekers de toegang tot de website ontzeggen{" "}
        </span>
        of bepreken.
      </p>
      <p>
        Wij aanvaarden geen verantwoordelijkheid voor eventuele gevolgen die
        voortvloeien uit wijzigingen of beëindiging van deze website of
        diensten.
      </p>
    </div>

    <div className="text-gray-600 text-sm sm:text-base/7 border-b border-gray-200 pb-4">
      <h5 className="font-semibold text-black text-xl">
        Toegangscontrole en monitoring
      </h5>
      <p className="mb-2">
        Tijdens jouw bezoek aan Verzilverjeoverwaarde.nl kunnen er
        <span className="font-semibold text-black">
          {" "}
          logbestanden worden aangemaakt.{" "}
        </span>
        Deze gegevens worden gebruikt voor:
      </p>
      <ul className="list-disc ml-5 mb-4">
        <li>technische monitoring</li>
        <li>website-statistieken</li>
        <li>het kunnen signaleren van misbruik of onrechtmatig gebruik.</li>
      </ul>
      <p>
        Op basis van deze gegevens kan Qonsult B.V. besluiten jouw toegang tot
        de website tijdelijk of permanent te beperken.
      </p>
    </div>

    <div className="text-gray-600 text-sm sm:text-base/7">
      <h6 className="font-semibold text-xl text-black mb-4">Vrijwaring</h6>
      <p>
        Door gebruik te maken van deze website,
        <span className="text-black font-semibold">
          {" "}
          vrijwaar je Qonsult B.V.,{" "}
        </span>
        haar werknemers, partners, vertegenwoordigers en auteurs van juridische
        stappen of schadeclaims die voortkomen uit jouw gebruik of misbruik van
        de website, of uit schending van wettelijke verplichtingen of rechten
        van derden.
      </p>
    </div>
  </div>
);

const PrivacyStatementContent = () => (
  <div className="space-y-4 p-3 sm:p-6">
    <h3 className="font-bold text-2xl">
      Privacy Statement Verzilverjeoverwaarde.nl
    </h3>
    <p className="text-gray-600 text-sm sm:text-base/7 border-b border-gray-200 pb-4">
      Bij Verzilverjeoverwaarde.nl nemen wij jouw privacy zeer serieus en
      verwerken wij jouw gegevens op een veilige en zorgvuldige manier. In dit
      privacy statement leggen wij uit welke gegevens wij verzamelen, waarom wij
      dat doen, en welke rechten je hebt met betrekking tot jouw
      persoonsgegevens. We raden je aan dit privacy statement aandachtig door te
      lezen. Vragen kun je stellen via:{" "}
      <span className="font-semibold text-black">
        info@verzilverjeoverwaarde.nl.
      </span>
    </p>
    <h4 className="font-semibold text-base sm:text-xl">Wie is Qonsult B.V.?</h4>
    <p className="text-gray-600 text-sm sm:text-base/7">
      Verzilverjeoverwaarde.nl is een handelsnaam van Qonsult B.V., gevestigd
      aan Bijlestaal 48L, 1721 PW Broek op Langedijk, ingeschreven bij de Kamer
      van Koophandel onder nummer 78747635.
    </p>
    <p className="text-gray-600 text-sm sm:text-base/7 border-b border-gray-200 pb-4">
      Qonsult B.V. is de verwerking verantwoordelijke voor de verwerking van
      jouw persoonsgegevens via Verzilverjeoverwaarde.nl.
    </p>
    <h5 className="font-semibold text-base sm:text-xl">
      Welke gegevens verzamelen wij en waarom?
    </h5>
    <p className="text-gray-600 text-sm sm:text-base/7">
      Hieronder staat per doel waarvoor wij persoonsgegevens verwerken, welke
      gegevens dat zijn, de juridische grondslag en de bewaartermijn.
    </p>
    <div className="flex gap-3">
      <span className="rounded-full border-l-4 border-primary-700"></span>
      <h6 className="font-semibold text-lg">
        Dienstverlening en administratie
      </h6>
    </div>

    <div className="rounded-xl overflow-hidden shadow-md">
      <table>
        <thead>
          <tr className="bg-primary-700 text-white">
            <th className="p-4">Doeleinde</th>
            <th className="p-4">Gegevens</th>
            <th className="p-4">Grondslag</th>
            <th className="p-4">Bewaartermijn</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100 text-gray-600">
            <td className="font-semibold text-black p-4 text-sm">
              Verlenen van onze dienst
            </td>
            <td className="p-4 text-sm">
              NAW-gegevens, e-mailadres, telefoonnummer, financiële gegevens,
              gegevens over jouw woning en wensen
            </td>
            <td className="p-4 text-sm">Uitvoering van de overeenkomst</td>
            <td className="p-4 text-sm">Maximaal 7 jaar</td>
          </tr>
          <tr className="border-b border-gray-100 text-gray-600">
            <td className="font-semibold text-black p-4 text-sm">
              Klachtafhandeling
            </td>
            <td className="p-4 text-sm">
              NAW-gegevens, dossiergegevens, communicatie
            </td>
            <td className="p-4 text-sm">
              Wettelijke verplichting / uitvoering overeenkomst
            </td>
            <td className="p-4 text-sm">Maximaal 7 jaar</td>
          </tr>
          <tr className="rounded-bl-xl rounded-br-xl text-gray-600">
            <td className="font-semibold text-black p-4 text-sm">
              Financiële administratie
            </td>
            <td className="p-4 text-sm">
              Bankgegevens, factuurgegevens, klantgegevens
            </td>
            <td className="p-4 text-sm">Wettelijke verplichting</td>
            <td className="p-4 text-sm">Maximaal 7 jaar</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="flex gap-3 pt-4">
      <span className="border-l-4 border-amber-600 rounded-full"></span>
      <h6 className="font-semibold text-lg">CRM en communicatie</h6>
    </div>

    <div className="rounded-xl overflow-hidden shadow-md">
      <table>
        <thead>
          <tr className="bg-amber-600 text-white">
            <th className="p-4">Doeleinde</th>
            <th className="p-4">Gegevens</th>
            <th className="p-4">Grondslag</th>
            <th className="p-4">Bewaartermijn</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-gray-600 border-b border-gray-100">
            <td className="font-semibold text-black p-4 text-sm">
              Klantbeheer / opvolging
            </td>
            <td className="p-4 text-sm">
              Naam, e-mailadres, telefoonnummer, locatie
            </td>
            <td className="p-4 text-sm">
              Gerechtvaardigd belang (klantrelatie)
            </td>
            <td className="p-4 text-sm">Maximaal 7 jaar</td>
          </tr>
          <tr className="text-gray-600">
            <td className="font-semibold text-black p-4 text-sm">
              Sollicitaties
            </td>
            <td className="p-4 text-sm">Naam, e-mailadres, CV, motivatie</td>
            <td className="p-4 text-sm">Gerechtvaardigd belang (werving)</td>
            <td className="p-4 text-sm">
              Maximaal 1 jaar na afronding procedure
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="flex gap-3 pt-4">
      <span className="border-l-4 border-green-600 rounded-full"></span>
      <h6 className="font-semibold text-lg">Marketing</h6>
    </div>
    <div className="rounded-xl overflow-hidden shadow-md">
      <table>
        <thead>
          <tr className="bg-green-600 text-white">
            <th className="p-4">Doeleinde</th>
            <th className="p-4">Gegevens</th>
            <th className="p-4">Grondslag</th>
            <th className="p-4">Bewaartermijn</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-gray-600 border-b border-gray-100">
            <td className="font-semibold text-black p-4 text-sm">
              E-mailmarketing / nieuwsbrief
            </td>
            <td className="p-4 text-sm">Naam, e-mailadres</td>
            <td className="p-4 text-sm">Toestemming</td>
            <td className="p-4 text-sm">Tot intrekking toestemming</td>
          </tr>
          <tr className="text-gray-600 border-b border-gray-100">
            <td className="font-semibold text-black p-4 text-sm">
              Retargeting en gedragsanalyse
            </td>
            <td className="p-4 text-sm">IP-adres, klik- en surfgedrag</td>
            <td className="p-4 text-sm">Gerechtvaardigd belang</td>
            <td className="p-4 text-sm">Zo lang als noodzakelijk</td>
          </tr>
          <tr className="text-gray-600">
            <td className="font-semibold text-black p-4 text-sm">
              Social media campagnes
            </td>
            <td className="p-4 text-sm">
              E-mailadres, surfgedrag, interactiegegevens
            </td>
            <td className="p-4 text-sm">Gerechtvaardigd belang</td>
            <td className="p-4 text-sm">Zo lang als noodzakelijk</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="flex gap-3 pt-3">
      <span className="border-l-4 border-purple-600 rounded-full"></span>
      <h6 className="font-semibold text-lg">Websitegebruik</h6>
    </div>

    <div className="border-b border-gray-200 pb-8">
      <div className="rounded-xl overflow-hidden shadow-md">
        <table className="w-full">
          <thead>
            <tr className="bg-purple-600">
              <th className="p-4 text-white">Doeleinde</th>
              <th className="p-4 text-white">Gegevens</th>
              <th className="p-4 text-white">Grondslag</th>
              <th className="p-4 text-white">Bewaartermijn</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="font-semibold text-black p-4 text-sm">
                Analytics
              </td>
              <td className="p-4 text-sm text-gray-600">
                IP-adres, surfgedrag, locatie
              </td>
              <td className="p-4 text-sm text-gray-600">
                Gerechtvaardigd belang
              </td>
              <td className="p-4 text-sm text-gray-600">
                Zo lang als noodzakelijk
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="font-semibold text-black p-4 text-sm">
                A/B testing / verbetering site
              </td>
              <td className="p-4 text-sm text-gray-600">
                IP-adres, interactie
              </td>
              <td className="p-4 text-sm text-gray-600">
                Gerechtvaardigd belang
              </td>
              <td className="p-4 text-sm text-gray-600">
                Zo lang als noodzakelijk
              </td>
            </tr>
            <tr>
              <td className="font-semibold text-black p-4 text-sm">
                Contact via chat of formulieren
              </td>
              <td className="p-4 text-sm text-gray-600">
                Naam, e-mailadres, berichtinhoud
              </td>
              <td className="p-4 text-sm text-gray-600">
                Uitvoering overeenkomst
              </td>
              <td className="p-4 text-sm text-gray-600">
                Zo lang als noodzakelijk
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <h6 className="font-semibold text-xl">Hoe verkrijgen wij jouw gegevens?</h6>
    <p className="border-b border-gray-200 text-gray-600 text-sm sm:text-base/7 pb-4">
      Wij verkrijgen jouw gegevens omdat je deze zelf aan ons verstrekt via onze
      website, formulieren of contactmomenten. In sommige gevallen ontvangen wij
      gegevens via betrouwbare partners of leadplatforms waarmee jij eerder
      contact hebt gehad en toestemming hebt gegeven voor doorverwijzing.
    </p>
    <h6 className="font-semibold text-xl">Jouw rechten onder de AVG</h6>
    <p className="text-gray-600">Je hebt als betrokkene de volgende rechten:</p>
    <ul className="text-sm sm:text-base/7 list-disc ml-5">
      <li className="text-gray-600">
        <span className="font-semibold text-black">Recht op inzage: </span>
        opvragen van jouw gegevens.
      </li>
      <li className="text-gray-600">
        <span className="font-semibold text-black">
          Recht op rectificatie:{" "}
        </span>
        incorrecte gegevens aanpassen.
      </li>
      <li className="text-gray-600">
        <span className="font-semibold text-black">
          Recht op verwijdering (‘vergetelheid’):{" "}
        </span>
        laten verwijderen van gegevens als daar geen grondslag meer voor is.
      </li>
      <li className="text-gray-600">
        <span className="font-semibold text-black">Recht op beperking: </span>
        beperken van verwerking onder bepaalde omstandigheden.
      </li>
      <li className="text-gray-600">
        <span className="font-semibold text-black">Recht op bezwaar: </span>
        bezwaar maken tegen verwerking gebaseerd op gerechtvaardigd belang.
      </li>
      <li className="text-gray-600">
        <span className="font-semibold text-black">
          Recht op dataportabiliteit:{" "}
        </span>
        je gegevens overdragen naar een andere partij.
      </li>
      <li className="text-gray-600">
        <span className="font-semibold text-black">
          Recht op intrekken toestemming:{" "}
        </span>
        indien van toepassing.
      </li>
    </ul>
    <p className="border-b border-gray-200 text-gray-600 pb-4">
      Je kunt deze rechten uitoefenen door een e-mail te sturen naar
      <span className="font-semibold text-black">
        {" "}
        info@verzilverjeoverwaarde.nl
      </span>
      . Wij reageren binnen uiterlijk één maand.
    </p>
    <h6 className="font-semibold text-xl">Ontvangers van jouw gegevens</h6>
    <p className="text-gray-600">Jouw gegevens kunnen worden gedeeld met:</p>
    <ul className="text-gray-600 list-disc ml-5 text-sm sm:text-base/7 ">
      <li>
        Verwerkers die namens ons diensten leveren (zoals hosting,
        e-mailverzending, CRM).
      </li>
      <li>Partners die meewerken aan jouw aanvraag of advies.</li>
      <li>
        Instanties waaraan wij wettelijk verplicht zijn gegevens te verstrekken
        (zoals de Belastingdienst).
      </li>
    </ul>
    <p className="border-b border-gray-200 pb-4">
      Met al onze verwerkers sluiten wij een verwerkersovereenkomst af.
    </p>
    <h6 className="font-semibold text-xl">Cookies en tracking</h6>
    <p className="text-gray-600 text-sm sm:text-base/7">
      Verzilverjeoverwaarde.nl maakt gebruik van cookies en vergelijkbare
      technieken om de website goed te laten functioneren en het gedrag van
      bezoekers te analyseren. Je krijgt bij eerste bezoek een cookiebanner
      waarmee je jouw voorkeuren kunt instellen.
    </p>
    <p className="border-b border-gray-200 pb-4 text-gray-600 text-sm sm:text-base">
      Voor uitgebreide informatie over ons cookiebeleid verwijzen we naar de
      [cookieverklaring] op onze website.
    </p>
    <h6 className="font-semibold text-xl">
      Wijzigingen in dit privacy statement
    </h6>
    <p className="border-b border-gray-200 text-gray-600 pb-4">
      Wij behouden ons het recht voor om dit privacy statement te wijzigen. De
      meest actuele versie is altijd beschikbaar op
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.verzilverjeoverwaarde.nl/"
        className="text-blue-600 font-semibold underline"
      >
        {" "}
        www.verzilverjeoverwaarde.nl.
      </a>{" "}
      Wij raden je aan dit regelmatig te controleren.
    </p>
    <h6 className="font-semibold text-xl">Vragen of klachten?</h6>
    <p className="text-gray-600 text-sm sm:text-base/7">
      Heb je vragen of klachten over je privacy of over dit statement? Neem dan
      contact op via:
    </p>
    <p className="font-semibold text-sm sm:text-base/7">📧 info@qonsult.nl</p>
    <p className="font-semibold text-sm sm:text-base/7">
      📍 Qonsult B.V., Bijlestaal 48L, 1721 PW Broek op Langedijk
    </p>
    <p className="text-gray-600 text-sm sm:text-base/7">
      Ben je niet tevreden over de afhandeling? Dan kun je ook een klacht
      indienen bij de Autoriteit Persoonsgegevens via
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.autoriteitpersoonsgegevens.nl/"
        className="text-blue-600 font-semibold underline"
      >
        {" "}
        www.autoriteitpersoonsgegevens.nl.
      </a>
    </p>
  </div>
);

const KlachtenStatementContent = () => (
  <div className="space-y-4 p-3 sm:p-6">
    <div className="text-gray-600 text-sm sm:text-base/7 border-b border-gray-200 pb-4">
      <h2 className="font-semibold text-black text-2xl mb-4">
        Klachtenregeling
      </h2>
      <p>
        Bent u ontevreden over de dienstverlening van Qonsult? Laat het ons
        weten. Wij willen graag dat u tevreden bent over onze dienstverlening.
        Toch loopt het soms anders. Dit vinden wij vervelend. Laat ons weten wat
        uw klacht is, dan zoeken we samen naar een passende oplossing.
      </p>
    </div>

    <div className="text-gray-600 text-sm sm:text-base/7 border-b border-gray-200 pb-4">
      <h2 className="font-semibold text-black text-xl mb-4">Klacht oplossen</h2>
      <p className="mb-2">
        Als u een klacht heeft kunt u deze per e-mail aan ons doorgeven op
        info@qonsult.nl Wij verzoeken u vriendelijk om in uw e-mail de volgende
        zaken te vermelden:
      </p>
      <ul className="list-disc ml-5">
        <li>Uw naam, adres, e-mail en telefoonnummer</li>
        <li>Een omschrijving van uw klacht</li>
        <li>
          Een inschatting van de eventuele schade (stuur bijvoorbeeld een nota
          als bijlage)
        </li>
        <li>Hoe u denkt dat we uw klacht naar tevredenheid kunnen oplossen.</li>
      </ul>
    </div>

    <div className="text-gray-600 text-sm sm:text-base/7 border-b border-gray-200 pb-4">
      <h2 className="font-semibold text-black text-xl mb-4">
        Klachtverwerking
      </h2>
      <p>
        Binnen tien werkdagen nemen wij contact met u op om de ontvangst van uw
        klacht te bevestigen en te controleren of we uw klacht goed begrijpen.
      </p>
      <p>
        We bekijken uw klacht aandachtig en zoeken uit wat er gebeurd is. We
        beoordelen uw klacht in alle redelijkheid en betrekken daar uiteraard
        ook uw financieel adviseur in. Als we tot de conclusie komen dat we
        fouten hebben gemaakt, bekijken we samen met u waar we ons kunnen
        verbeteren. En hoe we u tevreden kunnen stellen. U ontvangt binnen een
        redelijke termijn (maximaal 3 weken) definitief een antwoord met een
        oplossing.
      </p>
    </div>

    <div className="text-gray-600 text-sm sm:text-base/7 border-b border-gray-200 pb-4">
      <h2 className="font-semibold text-black text-xl mb-4">
        Tevreden oplossing
      </h2>
      <p>
        Bent u tevreden met de oplossing die we u geboden hebben? Dan zijn wij
        ook tevreden. U heeft ons in staat gesteld te leren van eventuele fouten
        en ons effectiever laten werken. Vanaf nu kunnen we ons blijven richten
        op het verder ontzorgen van uw financiële situatie.
      </p>
    </div>

    <div className="text-gray-600 text-sm sm:text-base/7 border-b border-gray-200 pb-4">
      <h2 className="font-semibold text-black text-xl mb-4">
        Herzieningsverzoek
      </h2>
      <p>
        Het kan natuurlijk zijn dat u het niet eens bent met de reactie op uw
        klacht, dan kunt u Qonsult vragen om haar standpunt te herzien. Dit kan
        door middel van een schriftelijke reactie naar info@qonsult.nl. Met name
        wanneer er sprake is van nieuwe of gewijzigde informatie en/of
        omstandigheden, kan het raadzaam zijn om een herzieningsverzoek in te
        dienen. Qonsult zal uw dossier dan heropenen en opnieuw beoordelen.
      </p>
    </div>

    <div className="text-gray-600 text-sm sm:text-base/7 border-b border-gray-200 pb-4">
      <h2 className="font-semibold text-black text-xl mb-4">Reactietermijn</h2>
      <p>
        Uw herzieningsverzoek moet binnen vier weken na dagtekening van het
        antwoord op uw klacht zijn ontvangen. Reacties of herzieningsverzoeken
        die na deze termijn worden ingediend beantwoorden wij niet meer
        inhoudelijk.
      </p>
    </div>

    <div className="text-gray-600 text-sm sm:text-base/7 border-b border-gray-200 pb-4">
      <h2 className="font-semibold text-black text-xl mb-4">
        Klachteninstituut Financiële Dienstverlening
      </h2>
      <p>
        Het Klachteninstituut Financiële Dienstverlening (hierna: Kifid) biedt u
        als consument één loket voor beslechting van geschillen over alle
        financiële diensten. De procedure is als volgt: Indien u geen reactie
        heeft ontvangen van Qonsult kunt u uw klacht vanaf 8 weken na het
        indienen van uw klacht bij info@qonsult.nl voorleggen aan het Kifid. Bij
        uw klacht moet uvermelden op welke datum u bij Qonsult heeft geklaagd en
        aangeven dat Qonsult niet binnen8 weken heeft gereageerd.
      </p>

      <p>
        Ook kunt u uw klacht indienen, nadat de interne klachtenprocedure bij
        Qonsult volledig is doorlopen en dit heeft geleid tot een definitieve
        afwijzing en u het met deze afwijzing niet eens bent. De klacht moet
        binnen een jaar ingediend worden nadat u uw klacht aan Qonsult heeft
        voorgelegd of binnen drie maanden na dagtekening van de definitieve
        reactie waarin Qonsult haar standpunt over uw klacht aan u kenbaar heeft
        gemaakt. Voor het indienen van uw klacht bij het Kifid en de
        klachtenprocedure van het Kifid verwijzen wij u naar de website van het
        Kifid, www.kifid.nl. Nadat uw klacht is geregistreerd, zal de
        Geschillencommissie van het Kifid beoordelen of uw klacht in behandeling
        kan worden genomen en zo ja, op welke wijze.
      </p>
    </div>
  </div>
);

const TermsContent = () => (
  <div className="space-y-4 p-3 sm:p-6">
    <div className="border-b border-gray-200 pb-4 text-gray-600">
      <h2 className="font-semibold text-2xl text-black mb-4">
        Gebruikersvoorwaarden Verzilverjeoverwaarde.nl
      </h2>
      <p className=" text-sm sm:text-base/7 mb-4">
        Door gebruik te maken van Verzilverjeoverwaarde.nl, een website van
        Qonsult B.V., stem je onvoorwaardelijk in met deze
        Gebruikersvoorwaarden, onze Disclaimer, de Privacyverklaring en het
        Cookiebeleid. De meest recente versie van deze documenten is steeds van
        toepassing en beschikbaar op deze website.
      </p>
      <p className="">
        Indien je vragen hebt over deze voorwaarden, kun je contact met ons
        opnemen via
        <span className="font-semibold text-black">
          {" "}
          info@verzilverjeoverwaarde.nl.
        </span>
      </p>
    </div>

    <div className="text-gray-600 border-b border-gray-200 pb-4">
      <h3 className="font-semibold text-black text-xl mb-4">
        Werking van onze website
      </h3>
      <p className="text-sm sm:text-base/7 mb-4">
        Via Verzilverjeoverwaarde.nl kun je
        <span className="text-black font-semibold">
          {" "}
          vrijblijvend en kosteloos een aanvraag indienen voor financieel advies{" "}
        </span>
        met betrekking tot het verzilveren van je overwaarde. Na het invullen
        van het formulier wordt jouw aanvraag beoordeeld door Qonsult B.V.
        Indien de aanvraag volledig is, sturen wij deze door naar een van onze
        aangesloten financieel adviseurs. Zij nemen vervolgens contact met je op
        voor een persoonlijk gesprek.
      </p>
      <p className="text-sm sm:text-base/7">
        <span className="text-black font-semibold">Let op: </span>
        Qonsult B.V. kan niet garanderen dat een aangesloten adviseur altijd
        contact met je opneemt.
      </p>
    </div>

    <div className="text-gray-600 border-b border-gray-200 pb-4">
      <h4 className="text-black font-semibold text-xl mb-4">
        Aangesloten adviseurs en kantoren
      </h4>
      <p className="text-sm sm:text-base/7 mb-4">
        Qonsult B.V. hanteert een zorgvuldig selectieproces bij het aansluiten
        van financieel adviseurs en kantoren. Desondanks kunnen wij geen
        garanties bieden over de kwaliteit of levering van diensten die door
        deze partijen worden uitgevoerd.
      </p>
      <p className="text-sm sm:text-base/7">
        De informatie op Verzilverjeoverwaarde.nl is algemeen van aard en vormt
        <span className="text-black font-semibold">
          {" "}
          geen persoonlijk advies.{" "}
        </span>
        Pas nadat je contact hebt met een aangesloten specialist, kan er
        eventueel persoonlijk advies gegeven worden. Qonsult B.V. is geen partij
        in enige overeenkomst die je sluit met een derde partij en is niet
        aansprakelijk voor schade die voortvloeit uit dienstverlening door een
        derde.
      </p>
    </div>

    <div className="text-gray-600 border-b border-gray-200 pb-4">
      <h5 className="text-xl font-semibold text-black mb-4">
        Formuliergegevens
      </h5>
      <p className="mb-4 text-sm sm:text-base/7">
        Wanneer je een formulier invult op Verzilverjeoverwaarde.nl, geef je
        uitdrukkelijk toestemming om je gegevens te delen met een aangesloten
        adviseur. Deze adviseur kan dan contact met je opnemen om jouw aanvraag
        op te volgen.
      </p>
      <p className="mb-4 text-sm sm:text-base/7">
        Je bent zelf verantwoordelijk voor het correct en volledig invullen van
        je gegevens. Qonsult B.V. is niet aansprakelijk voor schade die ontstaat
        door foutieve of onvolledige informatie die jij hebt verstrekt.
      </p>
      <p className="text-sm sm:text-base/7">
        Ook kunnen wij niet garanderen dat jouw aanvraag technisch succesvol
        wordt verzonden of op tijd wordt ontvangen en verwerkt.
      </p>
    </div>

    <div className="text-gray-600 border-b border-gray-200 pb-4">
      <h6 className="font-semibold text-xl mb-4 text-black">
        Aansprakelijkheid
      </h6>
      <p className="text-sm sm:text-base/7 mb-4">
        Qonsult B.V. spant zich in om deze website actueel, toegankelijk en
        correct te houden, maar garandeert dit niet. Wij zijn niet aansprakelijk
        voor:
      </p>
      <ul className="ml-5 list-disc leading-7 mb-4">
        <li>Onjuistheden of onvolledigheden op de website;</li>
        <li>
          Het niet beschikbaar zijn of onderbroken functioneren van de site;
        </li>
        <li>
          Beslissingen die zijn genomen op basis van informatie op de website;
        </li>
        <li>
          Eventuele schade die voortvloeit uit het gebruik van onze website;
        </li>
        <li>
          Handelen of nalaten van aangesloten derde partijen, waaronder
          adviseurs.
        </li>
      </ul>
      <p className="text-sm sm:text-base/7 mb-4">
        Qonsult B.V. is ook niet verantwoordelijk voor de inhoud van
        elektronische communicatie of de gevolgen daarvan.
      </p>
      <p className="text-sm sm:text-base/7">
        Kom je een fout tegen? Laat het ons weten via
        <span className="text-black font-semibold">
          {" "}
          info@verzilverjeoverwaarde.nl
        </span>
      </p>
    </div>

    <div className="text-gray-600 border-b border-gray-200 pb-4">
      <h6 className="text-black font-semibold mb-4 text-xl">
        Intellectuele eigendom
      </h6>
      <p className="text-sm sm:text-base/7">
        Alle inhoud op Verzilverjeoverwaarde.nl (zoals teksten, logo’s,
        afbeeldingen en code) is eigendom van Qonsult B.V., tenzij anders
        vermeld. Het is niet toegestaan om zonder voorafgaande schriftelijke
        toestemming informatie van deze website te kopiëren, verspreiden of
        publiceren.
      </p>
    </div>

    <div className="text-gray-600">
      <h6
        className="
      text-xl font-semibold mb-4 text-black"
      >
        Wijzigingen en geldigheid van voorwaarden
      </h6>
      <p className="text-sm sm:text-base/7 mb-4">
        Qonsult B.V. behoudt zich het recht voor deze Gebruikersvoorwaarden te
        wijzigen. De nieuwste versie is steeds van toepassing.
      </p>

      <p className="text-sm sm:text-base/7">
        Indien een bepaling uit deze voorwaarden (of uit de disclaimer of
        privacyverklaring) geheel of gedeeltelijk ongeldig of nietig wordt
        verklaard, blijven de overige bepalingen onverminderd van kracht. In dat
        geval zal Qonsult B.V. de nietige bepaling vervangen door een bepaling
        die zoveel mogelijk aansluit bij het doel en de strekking van de
        oorspronkelijke bepaling.
      </p>
    </div>
  </div>
);

// Main footer component
function Footer() {
  // State for modal visibility
  const [openModal, setOpenModal] = useState(null);

  // Function to handle opening a specific modal
  const handleOpenModal = (modalKey) => {
    setOpenModal(modalKey);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setOpenModal(null);
  };

  // Modal configurations - now passing the handleCloseModal function to AboutUsContent
  const modalContents = {
    aboutUs: {
      title: "Over ons",
      content: <AboutUsContent onClose={handleCloseModal} />,
      size: "lg",
    },
    disclaimer: {
      title: "Disclaimer",
      content: <DisclaimerContent />,
      size: "lg",
    },
    klachtenStatement: {
      title: "Privacy Statement",
      content: <KlachtenStatementContent />,
      size: "md",
    },
    privacyStatement: {
      title: "Privacy Statement",
      content: <PrivacyStatementContent />,
      size: "md",
    },
    terms: {
      title: "Gebruikersvoorwaarden",
      content: <TermsContent />,
      size: "lg",
    },
  };

  return (
    <footer className="custom-gradient w-full pt-4 sm:pt-[1rem] px-4 sm:px-8 lg:px-[6rem]">
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div className="space-y-8">
          {/* Logo and Description */}
          <div className="text-center">
            <Image
              src="/img/logo-blue.png"
              width={200}
              height={200}
              alt="Website logo"
              className="w-48 sm:w-56 mb-4 mx-auto drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]"
            />
            <div className="mb-4">
              <p className="text-gray-200 text-base sm:text-lg font-semibold">
                Deskundig hypotheekadvies voor elke situatie
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <div className="flex items-center gap-2 bg-white/5 rounded-full py-2 px-4 w-fit">
              <CheckIcon className="w-4 h-4 text-inherit bg-white p-1 rounded-full" />
              <p className="text-gray-200 text-sm">AFM Geregistreerd</p>
            </div>
            <div className="flex items-center gap-2 bg-white/5 rounded-full py-2 px-4 w-fit">
              <CheckIcon className="w-4 h-4 text-inherit bg-white p-1 rounded-full" />
              <p className="text-gray-200 text-sm">SEH Erkend Adviseur</p>
            </div>
          </div>

          {/* Phone Section */}
          <div className="flex gap-3 items-center justify-center border border-white/15 bg-white/5 p-4 rounded-xl max-w-sm mx-auto">
            <PhoneIcon className="w-8 h-8 p-2 rounded-xl text-white bg-primary-700/60" />
            <div>
              <p className="text-white font-semibold text-sm">Bel direct</p>
              <p className="text-white font-semibold text-lg">085 401 5280</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h2 className="text-white text-lg sm:text-xl mb-4 text-center">
              Meer informatie
            </h2>
            <ul className="space-y-1">
              <li className="flex pb-2 pt-3 justify-between items-center w-full group border-b border-blue-300/20">
                <button
                  onClick={() => handleOpenModal("aboutUs")}
                  className="text-base sm:text-lg text-white hover:text-blue-200 text-left flex-grow flex items-center cursor-pointer"
                >
                  <span>Over ons</span>
                </button>
                <svg
                  className="w-4 h-4 fill-white group-hover:translate-x-2 transition-all duration-300"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14m-7-7l7 7-7 7" />
                </svg>
              </li>
              <li className="flex pb-2 pt-3 justify-between items-center w-full group border-b border-blue-300/20">
                <button
                  onClick={() => handleOpenModal("disclaimer")}
                  className="text-base sm:text-lg text-white hover:text-blue-200 text-left flex-grow flex items-center cursor-pointer"
                >
                  <span>Disclaimer</span>
                </button>
                <svg
                  className="w-4 h-4 fill-white group-hover:translate-x-2 transition-all duration-300"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14m-7-7l7 7-7 7" />
                </svg>
              </li>
              <li className="flex pb-2 pt-3 justify-between items-center w-full group border-b border-blue-300/20">
                <button
                  onClick={() => handleOpenModal("klachtenStatement")}
                  className="text-base sm:text-lg text-white hover:text-blue-200 text-left flex-grow flex items-center cursor-pointer"
                >
                  <span>Klachtenregeling</span>
                </button>
                <svg
                  className="w-4 h-4 fill-white group-hover:translate-x-2 transition-all duration-300"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14m-7-7l7 7-7 7" />
                </svg>
              </li>
              <li className="flex pb-2 pt-3 justify-between items-center w-full group border-b border-blue-300/20">
                <button
                  onClick={() => handleOpenModal("klachtenStatement")}
                  className="text-base sm:text-lg text-white hover:text-blue-200 text-left flex-grow flex items-center cursor-pointer"
                >
                  <span>Privacy statement</span>
                </button>
                <svg
                  className="w-4 h-4 fill-white group-hover:translate-x-2 transition-all duration-300"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14m-7-7l7 7-7 7" />
                </svg>
              </li>
              <li className="flex pb-2 pt-3 justify-between items-center w-full group border-b border-blue-300/20">
                <button
                  onClick={() => handleOpenModal("terms")}
                  className="text-base sm:text-lg text-white hover:text-blue-200 text-left flex-grow flex items-center cursor-pointer"
                >
                  <span>Gebruikers voorwaarden</span>
                </button>
                <svg
                  className="w-4 h-4 fill-white group-hover:translate-x-2 transition-all duration-300"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14m-7-7l7 7-7 7" />
                </svg>
              </li>
            </ul>
          </div>

          {/* CTA Section - Mobile */}
          <div className="text-center space-y-4 bg-white/5 p-6 rounded-xl">
            <h2 className="text-white text-xl sm:text-2xl font-bold">
              Kosteloos adviesgesprek
            </h2>
            <p className="text-gray-300 text-sm sm:text-base">
              Krijg helder advies over uw hypotheek mogelijkheden. Plan vandaag
              nog uw kosteloos gesprek.
            </p>
            <a
              href="#"
              className="bg-accent-50 transition-all duration-300 text-white py-2.5 px-6 text-sm rounded-full inline-block hover:-translate-y-1 "
            >
              Vul het formulier in
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 items-center">
        <div>
          <div className="grid grid-cols-2 gap-20 min-h-full">
            <div className="mt-17">
              <Image
                src="/img/logo-blue.png"
                width={200}
                height={200}
                alt="Website logo"
                className="w-[17rem] mb-6 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]"
              />
              <div className="mb-4 font-semibold">
                <p className="text-gray-200 text-lg">
                  Deskundig hypotheekadvies voor elke situatie
                </p>
              </div>
              <div className="flex gap-1 mb-7 justify-between">
                <div className="flex items-center gap-2 bg-white/5 rounded-full py-1.5 px-3">
                  <CheckIcon className="w-4 h-4 text-inherit bg-white p-1 rounded-full" />
                  <p className="text-gray-200">AFM Geregistreerd</p>
                </div>
                <div className="flex items-center gap-2 bg-white/5 rounded-full py-1.5 px-3">
                  <CheckIcon className="w-4 h-4 text-inherit bg-white p-1 rounded-full" />
                  <p className="text-gray-200">SEH Erkend Adviseur</p>
                </div>
              </div>
              <div className="flex gap-3 items-center mb-5 border border-white/15 bg-white/5 p-5 rounded-xl">
                <PhoneIcon className="w-9 h-9 p-2 rounded-xl text-white bg-primary-700/60" />
                <div>
                  <p className="text-white font-semibold">Bel direct</p>
                  <p className="text-white font-semibold text-lg">
                    085 401 5280
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-17">
              <h2 className="text-white text-xl mb-3">Meer informatie</h2>
              <ul className="space-y-2 w-[60%]">
                <li className="flex pb-1 pt-4 justify-between items-center w-full group border-b border-blue-300/20">
                  <button
                    onClick={() => handleOpenModal("aboutUs")}
                    className="text-lg text-white hover:text-blue-200 text-left flex-grow flex items-center cursor-pointer"
                  >
                    <span>Over ons</span>
                  </button>
                  <svg
                    className="w-4 h-4 fill-white group-hover:translate-x-2 transition-all duration-300"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                </li>
                <li className="flex pb-1 pt-4 justify-between items-center w-full group border-b border-blue-300/20">
                  <button
                    onClick={() => handleOpenModal("disclaimer")}
                    className="text-lg text-white hover:text-blue-200 text-left flex-grow flex items-center cursor-pointer"
                  >
                    <span>Disclaimer</span>
                  </button>
                  <svg
                    className="w-4 h-4 fill-white group-hover:translate-x-2 transition-all duration-300"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                </li>
                <li className="flex pb-1 pt-4 justify-between items-center w-full group border-b border-blue-300/20">
                  <button
                    onClick={() => handleOpenModal("klachtenStatement")}
                    className="text-lg text-white hover:text-blue-200 text-left flex-grow flex items-center cursor-pointer"
                  >
                    <span>Klachtenregeling</span>
                  </button>
                  <svg
                    className="w-4 h-4 fill-white group-hover:translate-x-2 transition-all duration-300"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                </li>
                <li className="flex pb-1 pt-4 justify-between items-center w-full group border-b border-blue-300/20">
                  <button
                    onClick={() => handleOpenModal("privacyStatement")}
                    className="text-lg text-white hover:text-blue-200 text-left flex-grow flex items-center cursor-pointer"
                  >
                    <span>Privacy statement</span>
                  </button>
                  <svg
                    className="w-4 h-4 fill-white group-hover:translate-x-2 transition-all duration-300"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                </li>
                <li className="flex pb-1 pt-4 justify-between items-center w-full group border-b border-blue-300/20">
                  <button
                    onClick={() => handleOpenModal("terms")}
                    className="text-lg text-white hover:text-blue-200 text-left flex-grow flex items-center cursor-pointer"
                  >
                    <span>Gebruikers voorwaarden</span>
                  </button>
                  <svg
                    className="w-4 h-4 fill-white group-hover:translate-x-2 transition-all duration-300"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-3">
            <div className="col-span-2">
              <Image
                className="w-full"
                src="/img/footerimage.png"
                width={500}
                height={500}
                alt="footer foto"
              />
            </div>
            <div className="col-span-1 my-auto">
              <h2 className="text-white text-2xl mb-5">
                Kosteloos adviesgesprek
              </h2>
              <p className="text-gray-300 mb-5">
                Krijg helder advies over uw hypotheek mogelijkheden. Plan
                vandaag nog uw kosteloos gesprek.
              </p>
              <a
                href="#"
                className="bg-accent-50 transition-all duration-300 text-white py-2.5 px-4 text-sm rounded-full hover:shadow-md hover:shadow-gray-800 hover:-translate-y-1 inline-block"
              >
                Vul het formulier in
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Render modal based on which one is open */}
      {openModal && (
        <Modal
          isOpen={!!openModal}
          onClose={handleCloseModal}
          title={modalContents[openModal].title}
          size={modalContents[openModal].size}
        >
          {modalContents[openModal].content}
        </Modal>
      )}
    </footer>
  );
}

export default Footer;
