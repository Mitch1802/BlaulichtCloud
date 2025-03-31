--
-- PostgreSQL database dump
--

-- Dumped from database version 15.12 (Debian 15.12-1.pgdg110+1)
-- Dumped by pg_dump version 15.12 (Debian 15.12-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: dokumente_dokument; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.dokumente_dokument (pkid, id, created_at, updated_at, kuerzel, name, file, reihenfolge, kategorie) FROM stdin;
2	912461ec-3ef1-4387-8ce3-01dfc88a5434	2024-07-10 09:32:35.485528+00	2024-07-10 09:32:35.485556+00	D001	Hydrantennetz	dokumente/912461ec-3ef1-4387-8ce3-01dfc88a5434.pdf	\N	
3	58c9e558-b800-4978-b29c-7c3d4fa5db4f	2024-07-10 09:32:51.701012+00	2024-07-10 09:32:51.701051+00	D002	Infopoints	dokumente/58c9e558-b800-4978-b29c-7c3d4fa5db4f.pdf	\N	
4	24b4811e-1bbc-4484-a89d-611c1b6d62ac	2024-11-08 07:07:03.064143+00	2024-11-08 07:07:03.06417+00	D003	Kanalnetz	dokumente/24b4811e-1bbc-4484-a89d-611c1b6d62ac.pdf	\N	
\.


--
-- Data for Name: fahrzeuge_fahrzeug; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.fahrzeuge_fahrzeug (pkid, id, created_at, updated_at, kuerzel, name, foto, fahrzeug, anhaenger, type, lenkerberechtigung, stationierung, personenkapazitaet, treibstoff, nutzlast, ladebordwand, ladekran, wassertank, "wassertankAbnehmbar", "geschlossenerAufbau", anhaengervorrichtung, kategorie, reihenfolge, sonderausstattung) FROM stdin;
2	51dd642f-6beb-4fcd-8da0-79c1852dfcf6	2024-03-01 22:15:33.677+00	2024-05-11 21:11:57.592263+00	F002	Feuerwehr - Hilfeistungsfahrzeug 2400	fahrzeuge/51dd642f-6beb-4fcd-8da0-79c1852dfcf6.jpg	t	f	MAN	C	Feuerwehr	9	Diesel	0	f	f	2400	f	t	Rockinger - LKW		\N	
3	15f58f20-ef65-4ae1-873c-86f1cc7520b3	2024-03-01 22:16:12.347+00	2024-05-11 21:12:10.313505+00	F003	Feuerwehr - Tanklöschfahrzeug 4000	fahrzeuge/15f58f20-ef65-4ae1-873c-86f1cc7520b3.jpg	t	f	Steyr	C	Feuerwehr	9		0	f	f	4000	f	t			\N	
4	132332d6-dba9-493a-a9dd-336a6930c488	2024-03-01 22:18:18.094+00	2024-05-11 21:12:21.168561+00	F004	Feuerwehr - Versorgungsfahrzeug	fahrzeuge/132332d6-dba9-493a-a9dd-336a6930c488.jpg	t	f	Mercedes Sprinter	C	Feuerwehr	7	Diesel	2500	t	f		f	t	Kugelkopf		\N	
5	f3872821-cd99-481b-93aa-9cae8a1a8e64	2024-03-01 22:19:16.674+00	2024-05-11 21:12:36.811707+00	F005	Feuerwehr - Einachsanhänger	fahrzeuge/f3872821-cd99-481b-93aa-9cae8a1a8e64.jpg	f	t	Pongratz	B	Feuerwehr	0		750	f	f		f	t	Kugelkopf		\N	
6	706a0a92-b039-4b9f-9ea4-d2c73023ef3f	2024-03-13 10:22:22.984+00	2024-05-11 21:13:24.622469+00	F006	Gemeinde - Personentransporter	fahrzeuge/706a0a92-b039-4b9f-9ea4-d2c73023ef3f.jpg	t	f	Mercedes Benz Sprinter	B	Wirtschaftshof	9	Diesel	0	f	f		f	t	PKW - Kugelkopf		\N	
7	8c3bfed8-67e2-4fe0-aa74-395f2050537a	2024-03-13 10:23:27.834+00	2024-05-11 21:13:38.439799+00	F007	Gemeinde - Personentransporter E	fahrzeuge/8c3bfed8-67e2-4fe0-aa74-395f2050537a.jpg	t	f	Mercedes Benz - E Vito Tourer	B	Wirtschaftshof	8	Strom	0	f	f		f	t			\N	
8	bbae40de-34fb-4971-a602-881db93e0805	2024-03-13 10:24:43.336+00	2024-05-11 21:14:00.600776+00	F008	Gemeinde - Unimog - Mehrzweckfahrzeug	fahrzeuge/bbae40de-34fb-4971-a602-881db93e0805.jpg	t	f	UNIMOG Mercedes Benz	C	Wirtschaftshof	2	Diesel	5400	f	f	1000	t	f	LKW - Rockinger & Schneepflug		\N	
9	633417fa-e6f1-47a2-846a-020c8f0889ec	2024-03-13 10:25:51.628+00	2024-05-11 21:14:32.733525+00	F009	Gemeinde - Pritsche 1 (geschlossen)	fahrzeuge/633417fa-e6f1-47a2-846a-020c8f0889ec.jpg	t	f	Mercedes Benz Sprinter	B	Wirtschaftshof	3	Diesel	1145	f	f		f	t	Pkw - Kugelkopf		\N	
10	cb2425ed-54d8-4e7c-be06-6ac75a0ca457	2024-03-13 10:26:38.679+00	2024-05-11 21:14:45.260054+00	F010	Gemeinde - Pritsche 2 (offen)	fahrzeuge/cb2425ed-54d8-4e7c-be06-6ac75a0ca457.jpg	t	f	Mercedes Benz Sprinter	B	Wirtschaftshof	3	Diesel	0	f	f		f	f	PKW Kugelkopf		\N	
11	415dda90-24e2-45ba-b080-a34acadf66dc	2024-03-13 10:31:44.928+00	2024-05-11 21:15:03.013861+00	F011	Gemeinde - Radlader	fahrzeuge/415dda90-24e2-45ba-b080-a34acadf66dc.jpg	t	f	Komatsu WA 100 M	F	Wirtschaftshof	1	Diesel	0	f	f		f	f			\N	
12	c252349d-2e22-4a51-87b2-5e1e444b6dda	2024-03-13 10:32:39.229+00	2024-05-11 21:15:23.175641+00	F012	Gemeinde - Mini Bagger 1,5 t	fahrzeuge/c252349d-2e22-4a51-87b2-5e1e444b6dda.jpg	t	f	CAT 301-7D	F	Wirtschaftshof	1	Diesel	0	f	f		f	f			\N	
13	3c99d294-8c83-495d-b7f6-87323612f889	2024-03-13 10:52:21.918+00	2024-05-11 21:15:36.995282+00	F013	Gemeinde - Feldküche Anhänger	fahrzeuge/3c99d294-8c83-495d-b7f6-87323612f889.jpg	f	t	Kärcher TFK 250		Wirtschaftshof	0	Diesel	0	f	f		f	f	LKW Rockinger		\N	
14	3e58e544-259d-4f1c-93f3-affcaf518951	2024-03-13 10:53:22.175+00	2024-05-11 21:15:52.455207+00	F014	Gemeinde - PKW Anhänger	fahrzeuge/3e58e544-259d-4f1c-93f3-affcaf518951.png	f	t	Pongratz LH2600	E	Wirtschaftshof	0		2310	t	f		f	f	PKW Kugelkopf		\N	
15	e058c89f-a581-4ea9-bcc6-1b0300429db0	2024-03-13 10:54:02.901+00	2024-05-11 21:16:28.731106+00	F015	Gemeinde - Stapler 1 (groß)	fahrzeuge/e058c89f-a581-4ea9-bcc6-1b0300429db0.jpg	t	f	Mitsubishi FD25		Wirtschaftshof	0	Diesel	3500	f	f		f	f			\N	
16	944404d3-2f28-4a96-9eb1-00bec24214a5	2024-03-13 10:55:26.352+00	2024-05-11 21:16:42.098616+00	F016	Gemeinde - Stapler 2 (klein)	fahrzeuge/944404d3-2f28-4a96-9eb1-00bec24214a5.jpg	t	f	Mitsubishi FD25K		Wirtschaftshof	0	Diesel	0	f	f		f	f			\N	
1	71a8b222-2fcf-42a9-bc4b-5be453346657	2024-03-01 22:14:40.503+00	2024-05-11 21:11:17.351934+00	F001	Feuerwehr - Kommando & Mannschaftstransportfahrzeug	fahrzeuge/71a8b222-2fcf-42a9-bc4b-5be453346657.jpg	t	f	VW T5	B	Feuerwehr	8	Diesel	0	f	f		f	f	Kugelkopf		\N	
17	628da7c1-5abf-4a27-919e-00cf9739bea0	2024-03-13 10:56:18.4+00	2024-05-11 21:16:52.866093+00	F017	Gemeinde - Dumper (Japaner)	fahrzeuge/628da7c1-5abf-4a27-919e-00cf9739bea0.png	t	f	Wacker Neuson CA0023q	F	Wirtschaftshof	0	Diesel	0	f	f		f	f	LKW Bolzenmaul		\N	
18	67b17dfe-a4d9-4a51-b978-0b5004e13d7d	2024-03-13 10:57:34.964+00	2024-05-11 21:17:25.824346+00	F018	Gemeinde - Anhänger (Landwirtschaft)	fahrzeuge/67b17dfe-a4d9-4a51-b978-0b5004e13d7d.jpg	f	t	Fuhrmann (2 achsig)	E	Wirtschaftshof	0		4500	f	f		f	f	LKW - Deichsel		\N	
19	cbd48abf-6b33-4822-a72a-33759041f0af	2024-03-13 10:58:41.294+00	2024-05-11 21:17:40.532428+00	F019	Gemeinde - Multifunktionsfahrzeug (Kehrmaschine)	fahrzeuge/cbd48abf-6b33-4822-a72a-33759041f0af.png	t	f	Hako Citymaster 600	B	Wirtschaftshof	1	Diesel	0	f	f	1000	t	f			\N	
\.


--
-- Data for Name: gefahren_gefahr; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.gefahren_gefahr (pkid, id, created_at, updated_at, kuerzel, name, beschreibung, ausloeser, "feld1Name", "feld1Value", "feld2Name", "feld2Value", "feld3Name", "feld3Value", "feld4Name", "feld4Value", "feld5Name", "feld5Value", folgen, gefahren, reihenfolge) FROM stdin;
1	7458fe4f-92e3-44f0-94a4-011cf1c3a837	2024-07-06 13:02:51.050369+00	2024-07-06 13:02:51.050404+00	G001	Notunterkunft für Bevölkerung	Aufgrund eines Ereignisses ist eine Notunterkunft für die Bevölkerung notwendig.	rand (Unbenützbarkeit), Unwetter (Sturm, Wasser), Erdbeben, Ausfall Strom, Ausfall Heizung, Explosion.	Stufe 1: 1-2 Familien (unter 10 Personen)	Ersatzwohnungen: (füllen mit Leerstehenden Wohnungen, Häusern, Hotel im Ort)	Stufe 2: ca. 20 Personen	Örtliche Beherbergungsbetriebe: Notschlafstellen in Gemeindeeinrichtungen auflisten	Stufe 3: mehr als 20 Personen	Örtliche Beherbergungsbetriebe, Notschlafstellen in Gemeindeeinrichtungen, externe Einrichtungen (Verbringung)	Entscheidungsfrage	Kurz- oder langfristige Verlegung?			Notversorgung mit Nahrung, Kleidung, Dokumenten	lünderungen, Gefahr durch unbeobachtete Infrastruktur (Stromabschaltungen veranlassen), Verlust Wertgegenstände/Dokumente	\N
2	7d2a901d-9bb0-4d0d-b9b9-dad9e1eebf64	2024-07-06 13:16:25.254361+00	2024-07-06 13:16:25.254395+00	G002	Notversorgung für Bevölkerung (Essen/Getränke)	Es besteht keine Möglichkeit der Eigenversorgung mit Nahrung	Verlust Eigenheim, Ausfall Versorgung, Ausfall Energie, Keine Kochmöglichkeit, Grundwasserverunreinigung	Stufe 1: Ess- und Nahrungspakete für Haushalte	Var. a: Esspakete werden erstellt und ausgeliefert. Var. b: Esspakete werden erstellt und zentral ausgegeben. (Achtung - inmobile Betroffene beachten! )	Stufe 2: Zentrale Essensausgabe über Feldküche	Essensausgabe und Einnahme an einem zentralen Punkt - Auslieferung an inmobile Bevölkerung							Über längeren Zeitraum: Genaue Rationenplanung (Melderegister)	Allergien und Unverträglichkeiten, Zugangskontrollen können erforderlich sein.	\N
3	9b1f00e4-dd82-4f9e-9020-25a7756217ff	2024-07-06 13:22:16.193493+00	2024-07-06 13:22:16.193516+00	G003	Ausfall Trink- und Nutzwasser	Durch ein Ereignis muss der gesamte Ort oder Ortsteile bzw. Objekte mit Nutzwasser versorgt werden.	Leitungsbruch, Verunreinigung	Versorgung der Haushalte (mobil)	Zeitplan für die Wasserlieferung erstellen. Mit Feuerwehrfahrzeugen wird Nutzwasser gebracht. Trinkwasser ausschließlich in Wasserflaschen (PET) bereitstellen. Tagesbedarf berechnen und organisieren.	Versorgung zentral (Waschmöglichkeit)	Aufstellen von mobilen Wassertanks. Errichten einer Notdusche (M/W).							Gesundheitliche Beeinträchtigung (Hygiene, Keime,...)		\N
4	aa9d619b-3610-4ac5-a064-d8cdce8550b7	2024-07-06 13:26:55.040289+00	2024-07-06 13:26:55.040316+00	G004	Ausfall Strom	Ort oder Ortsteile stromlos	Blackout, Erdbeben, Explosion, Brand	Teilbereichsaufall	mobile Lichtpunkte, mobile Ladepunkte (Zeitplan erstellen)	Gesamtausfall	Mobile Lichtpunkte, mobile Ladepunkte (Zeitplan)	Entscheidungspunkt	Dauer des Stromausfalles - länger als 24h Maßnahmen empfohlen.					Längerer Zeitraum: Ausfall Heizung und Warmwasser, kein Kochmöglichkeit.	Notversorgung und Notunterkunft erforderlich	\N
5	585c0e72-7612-4d15-b3aa-4af59326fe25	2024-07-06 13:28:22.250564+00	2024-07-06 13:28:22.250593+00	G005	Ausfall Gas	Ausfall der Gasversorgung	Erdbeben, Gebrechen, Versorgungsengpass	Keine Heizmöglichkeit	Beheizte Notunterkunft erforderlich (Erhebung wieviele Haushalte Gasversorgt!)	Kein Warmwasser	Duschmöglichkeit in funktionierenden Einrichtungen: Hallenbad, Schulen,							Notversorgung und Notunterkunft möglicherweise erforderlich		\N
6	1f76b143-18bb-4de4-a885-41b4ca65450a	2024-07-06 13:32:07.951432+00	2024-07-06 13:32:07.951458+00	G006	Ausfall Nahrungsversorgung	Durch Isolation oder Versorgungsengpass ist keine Nahversorgung möglich.	Schnee, Ausfall von Verbindungen, Ausfall Transporteure, Versorgungsengpass	Übernahme der Logistikaufgaben	Kommissionierung, Rationenerstellung, Sammlung von vorhandenen Vorräten für die Rationenerstellung	Entscheidungspunkt	Dauer des Ausfalles							Notversorgung der Bevölkerung	Plünderungen (Lager über- bzw. bewachen, Standort nicht veröffentlichen)	\N
7	273d9b2a-be66-4332-9627-6d25222a5c24	2024-07-06 13:33:42.322399+00	2024-07-06 13:33:42.32243+00	G007	Ausfall Müllentsorgung	Ausfall der Abfallentsorgung - Grundsätzlich gedeckt durch Notfallplan der Entsorger.	Isolation, Streik.	Abtransport in Gemeinderegie	Zwischenlager definieren, Abbrandplatz definieren.									Seuchengefahr, Rattenplage.		\N
8	a0ec0d3b-0ace-437a-910f-75293fb23d4a	2024-07-06 13:35:59.1543+00	2024-07-06 13:35:59.154333+00	G008	Ausfall Fäkalienkanal	Ausfall des Abwasserkanals.	Erdbeben, Explosion, Blackout	Teilbereich	Einsatzsaugwagen in Kombination mit Auffangtanks	Pumpwerkausfall	Überlauf aktivieren	Gesamtausfall						Gewässer- und Bodenverunreinigung	berflutung von Bereichen mit Abwasser, Seuchen- und Gesundheitsgefahr für Menschen	\N
9	58ece76d-6f7e-4634-952c-7df6cad51614	2024-07-06 13:41:48.059195+00	2024-07-06 13:41:48.059232+00	G009	Ausfall Kommunikation	Ausfall der Kommunikation (Telefon, Internet). Ausfall Notrufnummern.	Blackout, Erdbeben,	Informationsweitergabe mobil	Lautsprecher durchsagen, Postwurfsendungen	Informationsweitergabe statisch	Informationspunkte definieren in Grätzel.	Informationssammelzentrum	FF Haus / Gemeindeamt besetzen mit Funkgeräten (Verbindungsoffiziere RK/FF einberufen)					Keine Notfallmeldung möglich. Meldepunkte einrichten (Schnittstelle RK/FF schaffen)	Ungemeldete Gefahren, z.B. Brandfortschritt, verzögerter Rettungseinsatz	\N
10	104a89a6-0318-4388-ab23-8a82764d77b5	2024-07-06 13:47:20.616174+00	2024-07-06 13:47:20.616209+00	G010	Massenanfall Tierkadaver	Infolge einer Tierseuche kommt es zu einen Massenanfall von Tierkadavern.	Tierseuche, Vergiftung;	Kleintiere		Großtiere		Geflügel		Abbrandplatz				Geruchsbelästigung, Dekontamination erforderlich.	Seuchen- und Gesundheitsgefahr für Mensch und Tier.	\N
11	b8907c0c-76c6-481f-878b-22a608b2aab4	2024-07-06 13:50:55.221793+00	2024-07-06 13:50:55.221827+00	G011	Massenanfall Leichen	Durch ein Ereignis kommt es zu einem Massenanfall von Leichen.	Erdbeben, Explosion, Brand, Flugzeugabsturz, Vergiftung, Seuche;	bholdung durch Bestattung, FF, Bauhof	Verbringung an Zwischenlagerplätze.									Dekontamination erforderlich	Seuchengefahr, Plünderungen	\N
12	33a9e223-a350-47f2-9ec7-f3dc6151cf26	2024-07-06 13:53:48.294268+00	2024-07-06 13:53:48.294299+00	G012	Ausfall Verkehrsverbindungen (Straße/Wege)	Durch ein Ereignis stehen wichtige Verbindungen nicht mehr zur Verfügung.	Erdbeben, Hochwasser, Schnee, Explosion.	Unerreichbarkeit von Ortsteilen	Errichten von Ersatzwegen.	Unerreichbarkeit des Ortes	Luftbrücke (BH, BMI)	Umleitungsgestaltung (Erkundung notwendig)						Versorgungsengpässe, Notunterkunft, Evakuierung.	Panik.	\N
13	6383636b-ab92-4ecf-893e-3ddf67feff8b	2024-07-06 13:56:57.453686+00	2024-07-06 13:56:57.453712+00	G013	Warnung und Information der Bevölkerung	Je nach Schadenslage kommen unterschiedliche Maßnahmen zur Anwendung. \nAkutgefährdung: Zivilschutzalarm	Verschiedene Katastrophenszenarien											Viele Rückfragen in Form von Anrufen, Mails oder persönliche Vorsprache. Vorbereitungen (Hotline einrichten, bzw. Personal VORHER instruieren)	Panik, Plünderungen,	\N
\.


--
-- Data for Name: gefahren_gefdokumente; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.gefahren_gefdokumente (id, dok_id_id, gef_id_id) FROM stdin;
\.


--
-- Data for Name: massnahmen_massnahme; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.massnahmen_massnahme (pkid, id, created_at, updated_at, kuerzel, name, beschreibung, kategorie, verantwortung, staerke, "feld1Name", "feld1Value", "feld2Name", "feld2Value", "feld3Name", "feld3Value", "feld4Name", "feld4Value", "feld5Name", "feld5Value", durchfuehrung, rueckbau, reihenfolge) FROM stdin;
3	1566eb2f-b087-4a46-b54a-463d8186c05a	2024-03-13 16:20:15.464+00	2024-07-06 10:55:32.693601+00	M002	Logistiktransport FF	Mit den angeführten Fahrzeugen, können verschiedene Logistiktransporte durchgeführt werden.\n\nRelevant ist ob das zu transportierende Material wettergeschützt oder offen transportiert werden kann.	F	Einsatzleiter Feuerwehr	10											Auftragserteilung. \nErreichbarkeiten austauschen.\nRückmeldung an den Stab-Meldekopf wenn Auftrag erledigt.	Reinigung - Dekontamination - Betankung.\n\nRückmeldung der Einsatzbereitschaft an den Stab - Meldekopf.	\N
4	faf45074-800c-4a2a-850e-ed72ade8af56	2024-03-13 19:17:00.5+00	2024-07-06 10:56:23.894362+00	M003	Arbeitsleistung Bauhof	Personalarbeitseinsatz - keine Fahrzeuge notwendig. \nDer diensthabende Wirtschaftshofleiter meldet die mögliche Personalressource dem Stab-Meldekopf.	G	Diensthabender Wirtschaftshofleiter	0	Maximale Personalressource:	3									Je nach Auftrag erfolgt die Rückmeldung ob dieser Auftrag personaltechnisch bewältigt werden kann oder weitere Ressourcen notwendig sind. \n\nRückmeldung wenn Auftrag durchgeführt ist.	Reinigung - (Arbeitskleidungstausch)\nDokumentation der eingesetzten Mitarbeiter inkl. Arbeitszeit. \n\nRückmeldung der Einsatzbereitschaft an den Stab-Meldekopf.	\N
5	97d55049-9469-4843-8443-6a65ce542f62	2024-03-13 19:24:13.509+00	2024-07-06 10:58:07.379698+00	M004	Arbeitsleistung FF	Personalarbeitseinsatz - keine Fahrzeuge notwendig. \nDer diensthabende Einsatzleiter der Feuerwehr meldet die mögliche Personalressource dem Stab-Meldekopf.	F	Einsatzleiter Feuerwehr	10	Mögliche Personalressource:	5									Je nach Auftrag erfolgt die Rückmeldung ob dieser Auftrag personaltechnisch bewältigt werden kann oder weitere Ressourcen notwendig sind. \n\nRückmeldung wenn Auftrag durchgeführt ist.	Rückmeldung der Einsatzbereitschaft an den Stab-Meldekopf.	\N
6	df160181-6351-4919-93fc-2a2b95ac686f	2024-03-13 19:25:50.997+00	2024-07-06 10:59:02.731198+00	M005	Arbeitseinsatz KAT Team	Personal Arbeitseinsatz vom KAT - Team (freiwillige Bürger die helfen).	G	KAT Team Leiter freiwillige Helfer	0											Nach der Verständigung des KAT-Team Leiters durch den Stab, werden die freiwilligen Helfer des KAT-Teams lt. Schlüsselpersonalliste verständigt.\n\n* Voraussichtliche Aufgaben\n* Notwendige Personalstärke (Schlüsselpersonal splitten, Schichtbetrieb notwendig?)\n* Spezielle Schutzmaßnahmen (Schutzanzüge, Einweghandschuhe, Gummistiefel, Taschenlampe\n\nNach der Abklärung, ist das KAT-Team zu verständigen und zu briefen.	Dokumentation:\nAnzahl und Namen eingesetzte Helfer\nEinsatzzeit und Einsatzdauer\nVorfälle und Verletzungen\nDebriefing (Kontakt mit kranken Personen, Aufenthalt in verseuchten Bereichen. \n\nAblage der Dokumentation im Stab-Meldekopf.	\N
7	2dab8946-7162-486d-b2bc-717f286c1460	2024-03-13 19:27:53.252+00	2024-07-06 10:59:37.991004+00	M006	Wasserversorgung (Nutzwasser) FF	Versorgung mit Nutzwasser durchgeführt mit den Löschfahrzeugen der Feuerwehr.	F	Einsatzleiter Feuerwehr	4	Tanklöschfahrzeug:	4000 l Nutzwasser	Hilfeleistungsfahrzeug:	2400 l Nutzwasser							Die Wassermenge von insgesamt 6400 l steht grundsätzlich immer sofort zur Verfügung. \nEin Betankungsvorgang dauert bei funktionierenden Wassernetz ca. 10 Minuten (ohne Fahrzeit) \nDie Wasserabgabe kann über den Wasserwerfer 2400l in der Minute oder feindosiert "Kübelabgabe" erfolgen.  \nDie Aufnahme von Wasser aus offenen Gewässer sollte aufgrund der Algenbildung im Tank vermieden werden.	Reinigung - Betankung Wasser - Betankung Treibstoff \n\nRückmeldung der Einsatzbereitschaft beim Stab-Meldekopf.	\N
8	c85ca8d6-8d70-4165-afd8-17d89267aea4	2024-03-13 19:37:45.243+00	2024-07-06 11:00:45.345837+00	M007	Wasserversorgung (Nutzwasser) Wirtschaftshof	Versorgung mit Nutzwasser durchgeführt mit den Möglichkeiten des Wirtschaftshofes	G	Diensthabender Wirtschaftshofleiter	0	Wasserentnahme wenn in Schwadorf nicht möglich:	Hochbehälter	1000l Behälter:	Stück: 1	400l Behälter:	Stück 1					Für den Transport der Wasserbehälter sind die zugewiesenen Fahrzeuge erforderlich. Reinigung der Behälter vor dem Einsatz. Gefüllte Wasserbehälter können nur mit einem Stapler auf- bzw. abgeladen werden. \nOptional können die leeren Behälter an den folgenden Punkten stationär aufgestellt werden und in Intervallen durch die FF befüllt werden:\n\nParkplatz Heidegasse\nRichard Trenkwalderplatz\nParkplatz Friedhof\nHauptplatz\nDoktors Garten\nSpielplatz Kellergasse\nBeserl Parktz\nFranz Hubergasse (Umkehrplatz)\nParkplatz GH Karl \nEMS\n\nDokumentation der Aufstellungsorte (Foto, Uhrzeit, Wassermenge)	Rücktransport der Behälter.\nReinigung und Desinfektion der Behälter. \n\nRückmeldung der Einsatzbereitschaft an den Stab-Meldekopf.	\N
18	295186af-24ff-4832-8fde-1b6780fb0bb5	2024-07-06 10:47:08.784144+00	2024-07-06 10:47:08.784179+00	M017	Logistiktransport Bauhof	Mit den Fahrzeugen und Anhänger des Wirtschaftshofes, können verschiedene Logistiktransporte durchgeführt werden.\n\nRelevant ist ob das zu transportierende Material wettergeschützt oder offen transportiert werden kann.	G	Leiter Bauhof	10											Je nach Auftrag wird vom diensthabenden Wirtschaftshofleiter die erforderlichen Fahrzeuge und Besatzungen entsandt. \n\nRückmeldung nach Auftragserledigung an den Stab - Meldekopf	Reinigung - Dekontamination - Betankung\n\nRückmeldung der Einsatzbereitschaft an den Stab - Meldekopf.	\N
2	db12bdca-d02a-46db-a6e5-dc4a4d34e86d	2024-03-13 16:17:25.85+00	2024-07-06 10:47:54.024928+00	M001	Logistiktransport Extern	Mit den angeführten Transportfirmen, können verschiedene Logistiktransporte durchgeführt werden.\n\nRelevant ist ob das zu transportierende Material wettergeschützt oder offen transportiert werden kann.	E	Meldekopf - Stab	0	Logistikfirma 1: AWS Schwadorf	Erreichbarkeit: Hr. Nemeth (0676/6016453)	Logistikfirma 2: Fa. Lengel (Container, Sattelzug, Ladekran, Radlader)	Erreichbarkeit: Hr. Stefan Lengel (0699/15158800)	Logistikfirma 3: Fa. Propangas	Erreichbarkeit:	Logistikfirma 4: Fa. Blaha (Schotter)	Erreichbarkeit:			Verständigung der externen Firmen. \nAusgabe des Auftrages (schriftlich)\nErreichbarkeiten austauschen\nWenn notwendig Lotsen oder Verbindungsmann beistellen\nDokumentation der Einsatzzeiten der externen Firmen. \n\nRückmeldung an den Stab bei Auftragserledigung.	Reinigung - Dekontamination - Betankung \n\nDokumentation Arbeitsende.\n\nRückmeldung an den Stab - Meldekopf.	\N
9	2c803ad3-07c4-4d94-bc42-f8e767cb4dca	2024-03-13 19:38:57.417+00	2024-07-06 11:03:15.649202+00	M008	Aktivierung Notstromeinspeisung Wirtschaftshof	Der Notstromgenerator für den Notbetrieb Wirtschaftshof wird in Betrieb genommen.	G	Diensthabender Wirtschaftshofleiter	0	Maximale Laufzeit ohne Tankvorgang:		Benötigte Dieselmenge pro Stunde:		Dauer bis zur Aktivierung:						Das Notstromaggregat ist beschriftet mit "Wirtschaftshof". Einspeisedose ist bei der Einfahrt alte Kläranlage. Die Dauer bis zur Inbetriebnahme dauert ca. 10 Min. In der Einspeisedose ist der Schalter für Netz/Not.	Betankung durchführen.	\N
10	359a5429-07f8-4a4d-9164-40a9043077d3	2024-03-13 19:43:22.72+00	2024-07-06 11:03:49.133481+00	M009	Notstromeinspeisung Feuerwehrhaus	Veranlassung der Notstromeinspeisung Feuerwehrhaus.	F	Einsatzleiter Feuerwehr	0	Maximale Laufzeit ohne Betankung		Dieselverbrauch pro/h		Dauer bis zur Aktivierung	ca. 40 Minuten					Das stationierte Notstromaggregat mit Stapler vom Lager heben und unter dem Flugdach in Position bringen. \n\nVerbindungskabel (Erdung) zum Blitzschutzerder herstellen.\n\nVerbindungskabel (Stromanschluss) durch Mauerdurchführung führen und an der vorgesehenen Steckdose anschließen. \n\nNotstromaggregat starten und im Technikraum den Schalter von Netz auf Not umstellen.	Notstromaggregat stoppen. Kabelverbindungen in umgekehrter Reihenfolge wieder abbauen. Schalter im Technikraum von Not wieder auf Netz stellen. Notstromaggregat betanken und wieder in das Deckenlager mit Stapler stellen.	\N
11	65e386eb-b8be-400d-bb73-40908c450b4d	2024-03-13 19:46:42.498+00	2024-07-06 11:04:15.088334+00	M010	Notstromeinspeisung Gemeindeamt	Aktivierung der Notstromeinspeisung am Gemeindeamt.	G	Diensthabender Wirtschaftshofleiter	0	Maximale Laufzeit ohne Betankung		Dieselverbrauch pro/h		Dauer bis zur Aktivierung	25 Minuten.					Mit dem Stapler oder Pritsche wird das mit "Gemeindeamt" beschriftete Aggregat in Stellung gebracht. Die Einspeisedose befindet sich auf der Seite beim Fahnenmast inkl. Schalter Netz/Not.		\N
12	3eec4088-4834-4b57-8e7a-c07845ae3667	2024-03-13 19:48:48.117+00	2024-07-06 11:04:34.551555+00	M011	Notstromeinspeisung Pumpwerke	Aktivierung der Notstromeinspeisung der Pumpwerke.	G	Diensthabender Wirtschaftshofleiter	0	Maximale Laufzeit ohne Betankung		Dieselverbrauch pro/h		Dauer bis zur Aktivierung	2 h					Folgende Pumpwerke sind notstrom versorgt:\n1. Johannesweg (Bruckerstrasse)\n2. Johannesweg (Johannesweg) \n3. Sportplatz (Eisenbahnbrücke)\n4. Sportplatz (Onr. 15)	Betankung	\N
13	281ad712-91b2-46fd-b420-20b57f338599	2024-03-13 19:53:39.716+00	2024-07-06 11:05:23.919954+00	M012	Kühlmöglichkeit Nahrung Feuerwehr	Kühlkapazitäten der Feuerwehr für die Kühlung von Nahrungsmittel.	F	Einsatzleiter Feuerwehr	0	Kühlkapazität	4 m³ = 2 Europaletten	Dauer bis Aktivierung	ca. 5 Stunden bis Abkühlung auf 4°							Die Kühlzelle in der Waschbox ist über einen Schalter (Kühlhaus "EIN") zu aktivieren. Die Abkühlungsdauer auf ca. 4-5° beträgt ca. 5 Stunden.	Schalter neben dem Kühlhaus auf "Aus" stellen. Keine weiteren Maßnahmen erforderlich.	\N
14	51857734-273e-4ec8-9340-7c96edda8675	2024-03-13 19:58:18.005+00	2024-07-06 11:06:12.916459+00	M013	Kühlmöglichkeiten Nahrung - Gemeinde	Möglichkeiten zur Kühlung von Nahrungsmittel.	G	Diensthabender Wirtschaftshofleiter	0	Aufzählung der Mobilen Kühlgeräte (Kühlschränke) mit Fassungsvermögen in Liter	4 Kühlschränke mit je 400l									Standorte, Inbetriebnahme.		\N
15	eb299403-3a10-4647-8d38-80def62235e5	2024-03-13 20:02:46.153+00	2024-07-06 11:06:55.141448+00	M014	Kühlmöglichkeiten Nahrung Extern	Kühlmöglichkeiten der örtlichen Gastronomie und Einrichtungen.	E	Stab - S4 - Versorgung	0	Extern: Autoanhänger Savel Himberg	Erreichbarkeit:	Extern: Weinbau Schüller Rauchenwarth	Erreichbarkeit:	Extern: Fleischerei Seethaler Himberg	Erreichbarkeit:	Extern: Getränke Maier Trautmannsdorf	Erreichbarkeit:	Extern: Katzianschütz Neusiedl	Erreichbarkeit:	Kapazitäten und Erreichbarkeiten.		\N
16	ad12dd20-0b7e-40ac-93d0-63ff282f1661	2024-03-13 20:07:48.725+00	2024-07-06 11:07:31.480087+00	M015	Treibstoffversorgung - Marktgemeinde	Kapazitäten für die Treibstoffversorgung durch die Marktgemeinde.	G	Diensthabender Wirtschaftshofleiter	0	Tankstelle Diesel (Liter)	20.000 l	Diesel in Kanister	1000 l	Benzin in Kanister	0 - Lagerhaus Tankstelle externe Einspeisung notwendig.							\N
17	f6408cee-732a-4bcc-a480-055e4189bfdd	2024-03-13 20:08:39.847+00	2024-07-06 11:07:54.647956+00	M016	Treibstoffversorgung - Extern	Tankmöglichkeiten bei Externen Betrieben oder Landwirten mit Haustankstellen.	E	Stab - S4 - Versorgung	0											Aufzählung von Firmen mit Mobilen Tankstellen, Landwirte oder Betriebe mit Betriebstankstellen (Lengel... ).		\N
19	bf6585f2-28e0-4c80-94f8-fe1e31d35299	2024-07-06 11:11:20.457981+00	2024-07-06 11:11:20.458004+00	M018	Tierkadavarbergung - klein	Bergung von Tierkadavern. Lager- bzw. Entsorgungsmöglichkeit	G	Diensthabender Wirtschaftshofleiter	2	Grabstelle Örtlichkeit		Feuerstelle Örtlichkeit	Schottergrube	Behälter für Bergung	Müllbehälter vom AWS					Aufnahme der Örtlichkeiten. (Anzahl Kadaver)\nAbklärung ob Ansteckungsgefahr für Menschen besteht. \nAbklärung Entsorgungort (Tierkörperverwertung Simmering, Tulln)\nAbklärung Zwischenlagerung, Direkttransport oder Selbstentsorgung (Feuerstelle)\nAusgabe Schutzbekleidung - Wirtschaftshof (Einweganzug, Handschuhe, Maske, Brille, Gummistiefel) \nNotwendige Geräte - Wirtschaftshof  (Heugabel, Schaufel, Greifzangen)\nKescher für Gewässer erforderlich (Fischer, Privatpools,)	Dokumentation der eingesetzten Personen\nDokumentation der geborgenen Kadaver\nReinigung und desinfizieren der Geräte (Desinfizierungsmittel am Wirtschaftshof)	\N
20	5020ded8-ee8e-48a2-995a-f01caa53c90a	2024-07-06 11:22:45.541182+00	2024-07-06 11:22:45.541215+00	M019	Kühlmöglichkeiten Leichen - FF	Lagerung von Leichen in Kühlzelle.	F	Einsatzleiter Feuerwehr	0	Kapazität in der Kühlzelle	4 m³	Leichenbergesäcke	100 Stück im K-Lager der FF							Leichen werden in Leichenbergesäcke gepackt und mit Versorgungsfahrzeug (geschlossener Aufbau) transportiert. \nBeschriftung der Säcke!	Dekontamination\nReinigung	\N
21	64c4cae6-1e8a-46d4-afb1-5bdbcf43ecac	2024-07-06 11:24:47.51031+00	2024-07-06 11:24:47.510344+00	M020	Tierkadavarbergung gross - Feuerwehr/Wirtschaftshof	Bergung von Tierkadavern. Lager- bzw. Entsorgungsmöglichkeit	F	Einsatzleiter Feuerwehr	0											Erkundung durch den Einsatzleiter\nAufnahme der Örtlichkeiten. (Anzahl Kadaver)\nAbklärung ob Ansteckungsgefahr für Menschen besteht. \nAbklärung Entsorgungort (Tierkörperverwertung Simmering, Tulln)\nAbklärung Zwischenlagerung, Direkttransport oder Selbstentsorgung (Feuerstelle)\nAusgabe Schutzbekleidung - Wirtschaftshof (Einweganzug, Handschuhe, Maske, Brille, Gummistiefel) \nFestlegung der Fahrzeuge und Geräte welche benötigt werden.	Dokumentation der Einsatzkräfte\nDekontamination\nReinigung\n\nRückmelden der Einsatzbereitschaft an den Stab.	\N
22	a4ff5406-320d-44bf-a6f4-cd5fed1a7423	2024-07-06 11:26:42.421813+00	2024-07-06 11:26:42.421845+00	M021	Kühlmöglichkeit Leichen - Gemeinde	Lagerung von Leichen (mit Kühlung).	G	Stab - S4 - Versorgung	0	Kühlmöglichkeit Aufbahrungshalle	2	Kühlmöglichkeit Weinkellern (Gemeinekeller) 7°	50							Leichenbergesäcke von FF organisieren. \nSchlüssel für Weinkeller organisieren. \nWichtig - eventuell Zusatzschlösser anbringen bzw. für Überwachung sorgen. \nBeschriftung der Leichenbergesäcke!	Dekontamination der Lagerräumlichkeiten.	\N
23	626c81fe-61bf-4b65-89cd-e7e0f235b3cb	2024-07-06 11:31:23.464302+00	2024-07-06 11:31:23.464356+00	M022	Feldlazarett mit Triage durch RK	Einrichtung Feldlazarett mit Triage. In Absprache mit Rettungsdienst.\nVar. 1 Zeltstadt (KHD RK), Var. 2. EMS . Raumaufteilung. Wegebeschreibung An- und Abfahrt.	R	Einsatzleiter RK / Stab - S3	0	Variante 1: Zeltstadt Örtlichkeit	Obere Umfahrungsstrasse 16, Wiese hinter Hallenbad	Variante 2: Europäische Mittelschule	Obere Umfahrungsstrasse 16, EMS	Variante 1a: Zeltstadt Örtlichkeit	Am Sportplatz					Das Rote Kreuz richtet nach eigenen Vorgaben und mit eigener Logistik ein Feldlazarett je nach Variante ein.		\N
24	c4f27d50-4cfc-428f-a63f-9eded5197512	2024-07-06 11:34:12.370151+00	2024-07-06 11:34:12.370179+00	M023	Notunterkunft klein - max. 20 Pers.	Unterbringung von 20 Personen. Örtliche Nächtigungsbetriebe. Überörtliche Nächtigungsbetriebe.	G	Stab - S4 - Versorgung	0	Kapazität in Schwadorf	Hotel Trischitz: 44 Betten	Kapazität Schwadorf Umgebung	Hotel Bauer Rauchenwarth, Hotel Himberg, Hotel Deininger Fischamend, NH Hotel VIE, Hotel Reinisch Mannswörth, Hotel Moxy VIE, Life Hotel Vienna Airport Fischamend;							rganisation von Nächtigungsmöglichkeiten in Ersatzwohnungen, Hotels, Pensionen in Schwadorf. Sind die Kapazitäten zu gering auch in der Umgebung von Schwadorf - Personentransport mit M324 sicherstellen. \n\nFeldbetten im K-Lager Gemeinde:\nFeldbette im K-Lager Feuerwehr:  30	Dokumentation der ausgelagerten Personen sowie Zeitraum.\nGemeindeeinrichtungen reinigen. Feldbetten desinfizieren.	\N
25	1ce7d76d-3777-41a7-a37d-1aaee39497ef	2024-07-06 11:36:27.451703+00	2024-07-06 11:36:27.451735+00	M024	Notunterkunft für mehr als 20 Pers.	Unterbringung von mehr als 20 Personen. Örtliche Nächtigungsbetriebe. Überörtliche Nächtigungsbetriebe.\nMassenquartier. EMS, Pfarrzentrum, VS, Kindergärten.	G	Stab - S3 - Einsatzmaßnahmen	0	Nächtigungsbetriebe Schwadorf		Nächtigungsbetriebe Umgebung Schwadorf	Hotel Bauer Rauchenwarth, Hotel Himberg, Hotel Deininger Fischamend, NH Hotel VIE, Hotel Reinisch Mannswörth, Hotel Moxy VIE, Life Hotel Vienna Airport Fischamend;	Kapazitäten Gemeindeobjekte	VS, EMS, Kindergärten, Pfarrzentrum;					Je nach Bedarf werden die erforderlichen Betten von den K-Lagern FF und Gemeinde inkl. Logistikmaßnahmen 300 und 302 abgerufen. Von den jeweiligen geplanten Objekten ist der Verantwortliche zu verständigen. Pro Objekt übernimmt ein Leiter der Liegenschaft die Kommunikation mit dem Stab und weißt die Kräfte welche die Logistikaufgaben wahrnehmen ein. \n\nSobald die Liegenschaften bezugsfertig sind, ist das dem Stab - Meldekopf zu melden.		\N
26	4bc5d8c5-18d5-4635-9007-1042231bdc69	2024-07-06 11:40:23.660605+00	2024-07-06 11:40:23.66064+00	M025	Personentransport max. 30 Pers.	Personentransport von weniger als 30 Personen mit Mitteln der Feuerwehr und Marktgemeinde	G		0	Busunternehmen Schwadorf	Fa. Keip	Busunternehmen Mannswörth	Fa. Aichinger	Taxiunternehmen Margarethen	Fa. Buchinger	Busunternehmen Bruck	Fa. Pipal	Taxiunternehmen Fischamend	Fa. Potucek			\N
27	b267916b-2df3-40b1-9be3-c39cacf651fa	2024-07-06 11:41:51.070946+00	2024-07-06 11:41:51.070978+00	M026	Personentransport mehr als 30 Pers.	Personentransport von mehr als 30 Personen mit Mitteln von Personentransportunternehmen. (Busfirmen, Taxi)	G	S3 - Einsatzmaßnahmen	0	Busunternehmen		Taxiunternehmen										\N
28	2491613f-e3a3-48f2-ae88-dc86b81ef4ea	2024-07-06 11:46:10.362892+00	2024-07-06 11:46:10.362921+00	M027	Notversorgung - Waschmöglichkeit Feuerwehr	Schaffen einer Waschmöglichkeit für mehrere Personen. (Notdusche, …)	F	Einsatzleiter Feuerwehr	0	Aufstellungsort	Am Sportplatz vor dem Schranken (Fam Jakubik)	Ausweichort		Aufbaudauer ca. 2 h	Info: NUR KALTWASSER MÖGLICH!					Mit dem K-Zelt der Feuerwehr, wird ein Sichtschutz gewährleistet. In weiterer Folge wird ein Düsenschlauch am Zeltdach befestigt.	Reinigung und Trocknung des Zeltes. \nAbbau.	\N
29	47df0619-21fa-4511-9156-b51a595ec0aa	2024-07-06 11:47:46.851887+00	2024-07-06 11:47:46.851933+00	M028	Notversorgung - Dekostelle Fahrzeuge und Geräte	Errichtung einer Dekostelle für Fahrzeuge und Geräte.	F	Einsatzleiter Feuerwehr	0											Mit 2 Löschfahrzeugen wird eine Dekostrasse errichtet. Durch die Verwendung vom TLFA kann ein Dekomittel über den Pumpenvormischer beigemengt werden.		\N
30	15d0b4b9-73f6-460f-8f9c-021f6e013d63	2024-07-06 11:49:39.155796+00	2024-07-06 11:49:46.259511+00	M029	Notversorgung - Nahrung (Esspakete)	Versorgung der Bevölkerung mit Grundnahrungsmittel. (Esspakete)	G	Stab S3, S4, - KAT Teamleiter Küche	0	Vorbereitungsraum 1	Kindergarten Franz Huber Gasse	Vorbereitungsraum 2	Europäische Mittelschule							Erhebung der nötigen Rationen (S1)\nErhebung der Nahrungsmittelbeschaffung (S4)\nÖrtlichkeit der Zusammenstellung definieren (S2)\nAusgabe durch Logistikmaßnahme organisieren (S3)	Verderbliche Essensreste entsorgen. Reinigung der Vorbereitungsräume. Einlagerung haltbarer Lebensmittel.	\N
31	e97a7518-e963-4962-b57f-08c3d66ce629	2024-07-06 11:51:52.108498+00	2024-07-06 11:51:52.108531+00	M030	Notversorgung - Nahrung (Feldküche)	Einsatz der Feldküche (Warmes Essen)	G		0	Kapazität der Feldküche	1000	Aufstellungsort 1	Innenhof EMS	Aufstellungsort 2	Am Sportplatz					Erhebung der nötigen Rationen (S1)\nErhebung der Nahrungsmittelbeschaffung (S4)\nÖrtlichkeit der Küchenaufstellung definieren (S2)\nOrganisieren des Transport der Feldküche zum Aufstellungsort \nAusgabe durch Logistikmaßnahme organisieren (S3)\nEinberufung KAT - Team Küche durch KAT-Team Leiter.	Reinigung der Feldküche, Einlagerung der haltbaren Lebensmittel.	\N
32	0eb37f73-0edd-4c10-876c-99a46a7af129	2024-07-06 11:54:31.886752+00	2024-07-06 11:54:31.886785+00	M031	Notversorgung - Müllentsorgung	Ausfall Müllentsorgung. Beseitigung von Müll. Zwischenlagerplatz. Abbrandplatz.	G	Stab - S3 - Einsatzmaßnahmen	0	Müll zwischen Lagerplätze bzw. Abbrandplatz	Schottergrube Blaha, Strabag, Böhm, Springer;									Grundsätzlich gibt es einen Notfallplan des Abfallverbandes.		\N
33	3e44b130-0c20-4f58-aef8-f59069d53fe3	2024-07-06 11:56:19.316224+00	2024-07-06 11:56:19.31625+00	M032	Ausfall Fäkalienkanal	Ausfall Fäkalienkanal durch Strukturschäden (Erdbeben oder Explosion)		Stab - S3 - Einsatzmaßnahmen	0	Fachfirma 1	Firma Picardi Götzendorf	Fachfirma 2	Firma Rohrer Schwechat	Fachfirma 3	Firma Hametner	Pumpen	Picardi, Rohrer, Hametner			Ausfall von Fäkalienkanal. Ableitung, Spülung, Abpumpen. Möglich durch Strukturschäden. (Erdbeben)		\N
34	8ce95c28-1758-4077-938d-1a646576ea37	2024-07-06 11:57:31.577176+00	2024-07-06 12:34:23.605119+00	M033	Notmaßnahme - Erd/Schotterbewegung	Herbei- oder Wegschaffen von Erdmaterialien. Bagger, Transportfahrzeuge.	0	Stab - S3 - Einsatzmaßnahmen	0	Bagger	Baumaschinen Glock Kleinneusiedl, Blaha, Hiller	Radlader	Fa. Lengel, Blaha,	Sattelauflieger (Schüttgut)	Blaha, Aichinger, Hofstädter, Huber, Lengel	Raupenbagger	Mayer,	Sand/Schotter	Blaha, Aichinger, Hofstädter, Huber, Lengel	Verständigung von Fachfirmen mit notwendigen Kapazitäten. Teilweise aus dem Ort. Dokumentation der Arbeits- und Einsatzzeiten.		\N
35	356c6851-9d88-4199-bd73-6a589e150b48	2024-07-06 12:36:29.584489+00	2024-07-06 12:36:29.584522+00	M034	Sperre öffentliche Plätze	Sperren von öffentlichen Plätzen mittels Absperrband, Absperrgitter. (Spielplätze, Parks)	G	Diensthabender Wirtschaftshofleiter oder KAT-Team	2	Auflistung der öffentlichen Plätze (Parks und Spielplätze)	Am Eisteich, EMS, Radrastplatz Himbergerstrasse, Friedhof, Neue Heimat Himbergerstrasse, Ziegelofen, Beserlpark, Dr. Garten, Am Sportplatz, Hauptplatz, Urban Gardening,	Notwendiges Absperrmaterial	10 Rollen Absperrband	Dauer der Durchführung	5 Stunden					Aufladen Absperrmaterialien\nDurchführung der Absperrung.\nDokumentation (Foto und Zeit der Sperre)\nMeldung an den Stab.	Rückbau der Absperrung und Versorgung. Meldung an den Stab.	\N
36	61cc4ff2-17be-41e4-bdeb-2922daa324a0	2024-07-06 12:37:52.464437+00	2024-07-06 12:37:52.464471+00	M035	Sperre Gemeindestrassen	Sperren von Gemeindestrassen mittels Absperrband, Absperrgitter. Verkehrsschilder	G	Diensthabender Wirtschaftshofleiter	0	Absperrmaterialien		Verkehrszeichen								Aufladen der erforderlichen Absperrmaterialien\nAbsperrung\nDokumentation (Datum, Zeit, Foto -> wie wurde gesperrt).\nMeldung an den Stab.	Abbau und Versorgung. \nRückmeldung an den Stab.	\N
37	54e51423-366e-41db-bf5f-1c4815284de0	2024-07-06 12:39:31.128779+00	2024-07-06 12:39:31.128805+00	M036	Notversorgung mit Medikamente	Versorgung der Bevölkerung mit Medikamente (z.b. Jodtabletten)	0	Stab - S3 - Einsatzmaßnahmen	0											Organisation der Medikamente (S4)\nAbholung der Medikamente (S3 -> Logistikmaßnahme M300)\nVerständigung des KAT-Teams freiwillige Helfer\nEinteilung der Helfer in Sprengel. \nAufteilung der Medikamente auf die Sprengel\nDokumentation der freiwilligen Helfer. \nStichprobenkontrollen der Gewährleistung der Zustellung	Versperren oder Entsorgen des Restbestandes. \nDokumentation der Einsatzzeiten und Namen der freiwilligen Helfer.	\N
38	61825c73-32fb-40af-a099-7bbcbac697f8	2024-07-06 12:42:33.849364+00	2024-07-06 12:42:33.849399+00	M037	Informationsverteilung Bevölkerung	Verteilung von Flugzetteln bzw. Infopoint Veranstaltungen.	G	Stab - S3 - Einsatzmaßnahmen / freiw. Helfer	0	Infopoints	Parkplatz Heidegasse Richard Trenkwalderplatz Parkplatz Friedhof Hauptplatz Doktors Garten Spielplatz Kellergasse Beserl Parktz Franz Hubergasse (Umkehrplatz) Parkplatz GH Karl  EMS	Anzahl von Postwurfen								Austragen von Postwurfsendungen durch freiwillige Helfer.\\nVerständigun KAT-Team Leiter freiw. Helfer.\nEinteilung und Durchführung. \n\nBei Infopoints werden Aufsteller mit Informationen aufgestellt. \nVerteilung der Aufsteller durch M300\n\nParkplatz Heidegasse\nRichard Trenkwalderplatz\nParkplatz Friedhof\nHauptplatz\nDoktors Garten\nSpielplatz Kellergasse\nBeserl Parktz\nFranz Hubergasse (Umkehrplatz)\nParkplatz GH Karl \nEMS	Einsammeln der Aufsteller. \nRückmeldung beim Stab.	\N
39	7e8a5993-4988-427e-bf88-4dc610688a7c	2024-07-06 12:43:31.83451+00	2024-07-06 12:43:31.834545+00	M038	Auslösung Zivilschutzalarm (Sirenen)	Auf Anordnung des behördlichen Einsatzleiters (Bezirkshauptmann) kann über die Landeswarnzentrale der Zivilschutzalarm ausgelöst werden.\n\n3 Minuten Dauerton: Warnung\nAuf- & Ab heulen: Alarm\n1 Minute Dauerton: Entwarnung	G	Örtlicher Einsatzleiter	0													\N
40	8c5bc330-6a18-4738-922c-c624a3eb2919	2024-07-06 12:44:37.208315+00	2024-07-06 12:44:37.208347+00	M039	Information via Lautsprecherdurchsagen (FF)	Mit dem Kommandofahrzeug der Feuerwehr werden Lautsprecher - Durchsagen durchgeführt.	F	Einsatzleiter Feuerwehr	0											Vor der Durchführung ist der genaue Text mit der behördlichen Einsatzleitung (S3) abzustimmen und der genaue Bereich zu definieren. Zeitaufwand ca. 1-2 Stunden.	Rückmeldung an den Stab - Meldekopf. Einsatzbereitschaft herstellen.	\N
41	728a5b65-aa19-42a1-956c-f0757f09fc63	2024-07-06 12:45:20.254441+00	2024-07-06 12:45:20.254473+00	M040	Auslösung KAT Warn APP	Die Auslösung der KAT Warn APP erfolgt ausschließlich auf Anordnung des behördlichen Einsatzleiter über die Bundeswarnzentrale.	G	Behördlicher örtlicher Einsatzleiter	0													\N
42	cd07bcbd-f96d-4673-a444-55039955b2bb	2024-07-06 12:45:58.694608+00	2024-07-06 12:45:58.694634+00	M041	Veranlassung Radio & TV Durchsagen	Die Veranlassung erfolgt ausschließlich über den behördlichen Einsatzleiter (Bezirkshauptmann).	G	Behördlicher örtlicher Einsatzleiter	0													\N
43	7e4e22b9-6637-42ba-bc65-8caf4883d37d	2024-07-06 12:46:31.869519+00	2024-07-06 12:46:31.869548+00	M042	Informationsverteilung via Social Media & Website	Informationsverteilung über diese Kanäle	G	Behördlicher örtlicher Einsatzleiter	0													\N
\.


--
-- Data for Name: gefahren_gefmassnahmen; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.gefahren_gefmassnahmen (id, gef_id_id, mas_id_id) FROM stdin;
1	1	3
2	1	4
3	1	5
4	1	6
5	1	18
6	1	23
7	1	24
8	1	25
9	1	26
10	1	27
11	1	37
12	2	3
13	2	4
14	2	5
15	2	6
16	2	13
17	2	14
18	2	15
19	2	18
20	2	30
21	2	31
22	3	6
23	3	7
24	3	8
25	3	28
26	3	37
27	3	38
28	4	6
29	4	9
30	4	10
31	4	11
32	4	12
33	4	38
34	6	2
35	6	3
36	6	4
37	6	5
38	6	6
39	6	13
40	6	14
41	6	15
42	6	18
43	6	30
44	6	31
45	7	6
46	7	38
47	8	6
48	8	33
49	8	38
50	9	4
51	9	5
52	9	6
53	9	18
54	9	38
55	10	3
56	10	4
57	10	5
58	10	18
59	10	19
60	10	21
61	11	3
62	11	4
63	11	5
64	11	18
65	11	20
66	11	22
67	12	4
68	12	34
69	12	36
70	12	38
71	13	38
72	13	39
73	13	40
74	13	41
75	13	42
76	13	43
\.


--
-- Data for Name: rollen_rolle; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.rollen_rolle (pkid, id, created_at, updated_at, kuerzel, name, beschreibung, notruf, aufgaben) FROM stdin;
19	b5137f33-6851-4231-bc33-2e486fb12424	2024-03-13 15:41:15.557+00	2024-03-13 15:41:15.557+00	R019	ÖBB Notfallkoordinator	Ist zu Verständigen wenn der Gleisbereich der ÖBB betroffen ist.	019300054530	Einstellung Zugverkehr. Entsendung eines ÖBB Einsatzleiters. Veranlasst Stromabschaltungen im Bereich der ÖBB
20	26bc9135-e8d0-43af-8ce2-ece3d4bbf90a	2024-03-13 15:41:50.31+00	2024-03-13 15:41:50.31+00	R020	Vorregion Busverkehr	Verkehrsplanung, Verkehrsleitung,		Ausweichstrecken für Busse. Beistellung von Transportmitteln.
3	2c0851c7-1f5a-4848-a273-1e1109eba242	2024-03-13 14:34:10.395+00	2024-07-06 09:38:52.450486+00	R003	Örtlicher Einsatzleiter (BGM)	Der örtliche Einsatzleiter ist der Bürgermeister. \nSollte dieser verhindert sein vertritt ihn der Vizebürgermeister.\n\nSollte der Vizebürgermeister ebenfalls verhindert sein, übernimmt diese Rolle XXX		Der örtliche Einsatzleiter koordiniert sämtliche Maßnahmen welche von der Bezirksverwaltungsbehörde angeordnet wurden. Der örtliche Einsatzleiter kann sich an dem Führungsstab bedienen, welcher vom örtlichen Einsatzleiter in der notwendigen Stärke einberufen wird. Er hält Verbindung zur BH und gibt Rückmeldungen über die Lageentwicklung. Je nach Schadensszenario kann von den eingesetzten Einsatzorganisationen ein Verbindungsoffizier angefordert werden. Die Verständigung der Verbindungsoffiziere obliegt den Stabsmitarbeitern mit dem Hinweis \\"Verbindungsoffizier zum Stab entsenden\\". Weiters melden die eingesetzten Einsatzkräfte regelmässig die Lageentwicklung. Sofern dies nicht selbstständig passiert, ist eine Lagemeldung bei den Einsatzorganisationen einzuholen.
4	92d0329e-50cd-462b-89e0-24f3363fb26d	2024-03-13 14:35:58.01+00	2024-07-06 09:41:13.578037+00	R004	Stabsfunktionen S1 - S6	Stabsfunktionen S1 - S6. \n\nMeldekopf.\nFühren der Lage.\nVerständigungen.\\nDokumentation.\nNachbereitung.		Nach der Verständigung wird der Stabsführungs- und Lageraum eingerichtet (Sitzungssaal Gemeindamt). \n\nDie S-Funktionen bereiten Ihre nötigen Hilfsmittel vor.
5	4a704b63-5307-40dc-87bc-60a3641001fd	2024-03-13 14:43:53.098+00	2024-07-06 09:41:58.034928+00	R005	Polizei	Es ist ein Verbindungsoffizier der Polizei als Unterstützung für die Stabsarbeit anzufordern.	133	Aufgaben laut definierten Hoheitsaufgaben. (Erhebung, Absicherung, Verständigungen).
6	6716746b-cd5d-4cd0-a067-4e8859ce2b9b	2024-03-13 14:47:23.902+00	2024-07-06 09:44:33.678796+00	R006	Einsatzleiter Rettungsdienst	Es ist ein Verbindungsoffizier der Rettung als Unterstützung für den Stab anzufordern. Verständigung erfolgt durch den Stab.		
7	796e2a01-333e-4251-9db2-14d4e2f7f20c	2024-03-13 14:48:34.607+00	2024-07-06 09:45:20.925163+00	R007	Energieversorger Strom	Energieversorger Strom. Zuständig für die Stromversorgung.	0800500600	Verantwortlich für Schadensbehebung bei Schäden an der Stromversorgung im öffentlichen Bereich.
8	4179c14c-cc4a-460b-bb2f-be6e2cdbddde	2024-03-13 14:49:38.565+00	2024-07-06 09:47:21.44154+00	R008	Energieversorger Wasser	EVN	0225289616	Zuständig für die Wasserversorgung inkl. Leitungen im Ortsgebiet Schwadorf. Öffentlicher Grund.
11	9f85756c-ae5e-41ec-bf9a-a269ab623a01	2024-03-13 15:13:38.246+00	2024-07-06 09:51:34.993828+00	R011	Leiter Wirtschaftshof	Leitet den Wirtschaftshof.		Organisiert und Verständigt das Wirtschaftshofpersonal. Setzt die Maßnahmen um. Gibt Lagemeldungen an den Stab weiter.
9	6862bfda-463d-4559-b67e-1dda276e0449	2024-03-13 14:52:18.117+00	2024-07-06 09:49:09.324363+00	R009	Energieversorger Gas	Energieversorger Gas.Zuständig für die Infrastrukur der Gasversorgung. (alles vor dem Gaszähler).	128	Absperrungen von Gasleitungen (vor dem Gaszähler). Messungen von Gaskonzentrationen. Freigabe von abgesperrten Gasleitungen (auch in Wohnungen).
10	4af00dce-3293-4713-9818-1cc9f54a79c9	2024-03-13 15:09:41.777+00	2024-07-06 09:50:56.489138+00	R010	Flugplatzbetriebsleitung & Austrocontrol	Zuständig für den Flugplatz (Airside). Freigabe von Starts und Landungen.\nAustrocontrol: Luftraumüberwachung bzw. Freigabe.	017007155	Sperre vom Luftverkehr Abflug und Landungen. \nAustrocontrol: Sperre Luftraum.
12	b6459241-4d85-4ba3-8a61-be29e25f198a	2024-03-13 15:15:01.277+00	2024-07-06 09:52:37.206761+00	R012	Schulleiter EMS	Schulleiter der EMS. \nAnzahl der Klassenräume:\nAnzahl der Duschmöglichkeiten:		Verständigt den Schulwart. \nStellt die notwendigen Räumlichkeiten zur Verfügung.
13	ca01c170-d47d-46f6-8c21-5edb5817e348	2024-03-13 15:17:57.456+00	2024-07-06 09:53:36.955447+00	R013	Schulleiter VS	Leitet die VS. \nSchulklassen Räume:\nDuschmöglichkeiten:		Verständigt den Schulwart.\nStellt die Räumlichkeiten zur Verfügung.
14	5d4d9496-a71b-492a-b12d-1363ef7cbb42	2024-03-13 15:18:34.49+00	2024-07-06 09:54:10.439325+00	R014	Gemeindearzt	Ist für das Gesundheitswesen verantwortlich.		Kooperiert mit dem Stab und den Hilfskräften. Leitet mit dem RK das Feldlazarett.
15	afb7186d-a749-4521-9d8b-421013b2e5b0	2024-03-13 15:20:33.303+00	2024-07-06 09:54:31.030259+00	R015	KAT Teamleiter Küche	Organisiert das Team der Feldküche bzw. ist verantwortlich für die Nahrungsmittelausgabe. \n\nDie Beschaffung der Nahrungsmittel organisiert der Stab.		Organisiert das KAT Team Küche. Einberufung vom notwendigen Schlüsselpersonal bzw. Einteilung der freiwilligen Helfer (nicht Einsatzorganisation). \n\nZusammenstellung von Nahrungsmittelpaketen für die Ausgabe an der Bevölkerung. Rationenerstellung. \n\nBetreuung der Feldküche.
16	3b3f7994-2712-4e16-afd3-450926be4cf0	2024-03-13 15:27:15.437+00	2024-07-06 09:54:42.420879+00	R016	KAT Teamleiter Gesundheit	Verantwortlicher für das Schlüsselpersonal Gesundheit:\nÄrzte, Krankenpflegerinnen, Notfallsanitäter, Rettungssanitäter;		Organisiert das Schlüsselpersonal für Gesundheit. Dieses Personal unterstützt in Gesundheitskrisen, Feldlazarett, Massenanfall von Kranken, Seuchen bei Menschen, etc. \n\nDie Schutzbekleidung wird vom Stab organisiert und beigestellt.
17	85fa9c59-7c44-40b2-9e75-7503324a7693	2024-03-13 15:39:41.473+00	2024-07-06 09:55:14.035979+00	R017	KAT Teamleiter Energie	Verantwortlich für das KAT Team Energie. Schlüsselpersonal für Elektrotechnik, Installationstechnik.		Organisiert das KAT Team Energie. Unterstützt mit Fachkenntnissen über Elektro- und Installationstechnik. \n\nErstellt provisorische Infrastrukturlösungen.
18	cdf866dc-a19a-4666-a509-80081321c8e3	2024-03-13 15:40:39.769+00	2024-07-06 09:55:37.940107+00	R018	KAT Teamleiter freiwillige Helfer	Verantwortlich für das Schlüsselpersonal KAT Team freiwillige Helfer.		Organisiert freiwillige Helfer. Teilt die Aufträge an die freiwilligen Helfer. Dokumentiert die Anzahl der Helfer, Einsatzzeiten der Helfer. \nFür dieses Team sind keine speziellen Fähigkeiten erforderlich. (Jedermann)
21	5fb9e88d-edc5-44cf-b19a-8c9a6347c7d8	2024-03-13 15:42:31.563+00	2024-07-06 09:56:13.710661+00	R021	Amtstierarzt	Veterinär Mediziner. Entscheidungsträger bei Maßnahmen.	Über BH Bruck Journaldienst zu verständigen!	Entscheidet über Maßnahmen und Vorgangsweisen im Anlassfall.
22	87513fbe-ea4d-4672-bdbe-5d43f9c73564	2024-03-13 15:43:02.997+00	2024-03-13 15:43:02.997+00	R022	Leiter Kindergarten 1 (Passauerstrasse)	Leitet die KG \nBeistellung Notquartier		Beistellung der Räumlichkeiten als Notquartier oder Essensausgabestelle.
23	64268244-2878-49a9-97d4-5c424a5acbd1	2024-03-13 15:43:45.376+00	2024-03-13 15:43:45.376+00	R023	Leiter Kindergarten 2 (Franz Huber Gasse)	Leitet Kindergarten\nBeistellung Räumlichkeiten für Notquartier.		Stellt Notquartier und Essensausgabestelle.
1	d9a7582f-1a44-4d56-98ba-a519a95d7b4e	2024-03-01 22:29:49.187+00	2024-07-06 09:37:12.504606+00	R001	Behördlicher Einsatzleiter	Der behördliche Einsatzleiter ist der Bezirkshauptmann. Er ist die oberste Instanz bei Katastrophen. \n\nZu den Geschäftszeiten wird der Bezirkshauptmann über die Amtsleitung der BH Bruck verständigt. \n\nAusserhalb der Geschäftszeiten erfolgt die Verständigung über die Polizei.	133	
2	fa019c30-3c5b-4370-9762-242042689a8a	2024-03-01 22:33:52.507+00	2024-07-06 09:38:15.197214+00	R002	Einsatzleiter Feuerwehr	Der Einsatzleiter der Feuerwehr führt die Feuerwehreinsatzkräfte im Gemeindegebiet. Er ist für die Einsatzmaßnahmen der Feuerwehr zur Brandbekämpfung, technische Hilfeleistungen bei Gefahr im Verzug und Menschenrettung verantwortlich.	122	Gefahrenabwehr, Assistenzleistungen bei Bedarf. Der Einsatzleiter der Feuerwehr bedient sich an der Feuerwehreinsatzleitung und bildet im erforderlichen Fall einen Stab.   Es besteht die Möglichkeit dass der örtliche Feuerwehreinsatzleiter die Einsatzleitung der Feuerwehr an einem Funktionär des NÖLFV übergibt (Abschnitts-, Bezirks-, Landesfeuerwehrkommandant).   Sofern Geräte, Personal oder Fahrzeuge aus dem Katastrophenhilfsdienst erforderlich sind, werden diese vom Einsatzleiter der Feuerwehr über das Bezirksfeuerwehrkommando bzw. die Landeswarnzentrale angefordert. Bei Bedarf wird ein Verbindungsoffizier der Feuerwehr zum Führungsstab der Gemeinde entsendet. Dieser ist mit Laptop, Telefon und Tetrafunkgerät ausgerüstet.
\.


--
-- Data for Name: gefahren_gefrollen; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.gefahren_gefrollen (id, gef_id_id, rol_id_id) FROM stdin;
1	1	1
2	1	2
3	1	3
4	1	4
5	1	5
6	1	6
7	1	11
8	1	12
9	1	13
10	1	15
11	1	18
12	1	20
13	1	22
14	1	23
15	2	1
16	2	2
17	2	3
18	2	4
19	2	5
20	2	11
21	2	12
22	2	15
23	2	18
24	3	1
25	3	2
26	3	3
27	3	4
28	3	8
29	3	11
30	3	14
31	3	18
32	4	1
33	4	2
34	4	3
35	4	4
36	4	7
37	4	11
38	4	17
39	4	18
40	5	1
41	5	2
42	5	3
43	5	9
44	5	11
45	5	17
46	6	1
47	6	2
48	6	3
49	6	4
50	6	11
51	6	12
52	6	15
53	7	1
54	7	2
55	7	3
56	7	11
57	7	18
58	8	1
59	8	2
60	8	3
61	8	11
62	8	17
63	8	18
64	9	1
65	9	2
66	9	3
67	9	4
68	9	5
69	9	6
70	9	11
71	9	18
72	10	1
73	10	2
74	10	4
75	10	11
76	11	1
77	11	2
78	11	3
79	11	4
80	11	5
81	11	6
82	11	11
83	11	14
84	12	1
85	12	2
86	12	3
87	12	4
88	12	5
89	12	6
90	12	11
91	12	18
92	12	20
93	13	1
94	13	2
95	13	3
96	13	4
97	13	5
98	13	6
\.


--
-- Data for Name: kat_material_katmaterial; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.kat_material_katmaterial (pkid, id, created_at, updated_at, artikel, bemerkung, menge, stationierungsort) FROM stdin;
1	3f5ea825-2de3-4558-a19d-c6b0c19eb92c	2024-03-01 22:08:45.582+00	2024-03-01 22:08:45.582+00	Zelte	9/12/30 m²	4	
2	96bb706a-e749-4ae2-b929-e09d68e866cf	2024-03-01 22:09:07.447+00	2024-03-01 22:09:07.447+00	Trinkwasser	Paletten	3	Wirtschaftshof
3	660717d8-7887-4372-8b17-5fe106567d00	2024-03-01 22:09:28.746+00	2024-03-01 22:09:28.746+00	Dosenbrot		0	
4	d895617b-4528-4ba0-af95-e7a5d612bf6c	2024-03-01 22:10:13.287+00	2024-03-01 22:10:13.288+00	Einweghandschuhe		1000	Feuerwehr & Wirtschaftshof
5	efc992ca-b0b2-46fc-9dd0-3acd987faed5	2024-03-01 22:10:32.54+00	2024-03-01 22:10:32.54+00	Masken FFP2		100	Feuerwehr & Wirtschaftshof
6	36883a88-c8f6-46c0-bd95-b8cf120f260a	2024-03-01 22:10:42.629+00	2024-03-01 22:10:42.629+00	Schutzanzüge		50	Feuerwehr & Wirtschaftshof
7	646174f2-5d52-433a-80c4-baa02074a875	2024-03-01 22:11:36.943+00	2024-03-01 22:11:36.943+00	Sandsäcke		250	Feuerwehr
8	220bfd42-71e4-46e2-9e01-e7adb3004ad2	2024-03-01 22:11:50.685+00	2024-03-01 22:11:50.685+00	Decken		300	Wirtschaftshof
9	eaf307db-b768-4a27-8e44-c6c60ae5ee79	2024-03-01 22:12:05.945+00	2024-03-01 22:12:05.945+00	Feldbetten		300	Wirtschaftshof
10	b5e25519-e8b0-4042-a695-fa49314aa488	2024-03-01 22:12:38.355+00	2024-03-01 22:12:38.355+00	Heizgeräte	Diesel mit 958l Tank	2	Wirtschaftshof
\.


--
-- Data for Name: katastrophen_katastrophe; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.katastrophen_katastrophe (pkid, id, created_at, updated_at, kuerzel, name, beschreibung, reihenfolge) FROM stdin;
2	0c16af7f-875e-49cf-bab6-d4a89ab43630	2024-03-13 10:15:32.607+00	2024-07-06 14:00:39.591603+00	K001	Radioaktive Verstrahlung	Eine radioaktive Verstrahlung kann insbesondere durch Niederschlag, aber auch durch die Luft übertragen werden.  Es kann möglich sein, dass die Bevölkerung die Wohneinheiten über einen längeren Zeitraum nicht verlassen dürfen.	\N
3	becd3009-e6be-4f53-bd95-96d6401fda83	2024-07-06 14:04:11.750715+00	2024-07-06 14:04:11.750749+00	K002	Hochwasser	Durch hohe Niederschlagsmengen kann es zu Überflutungen kommen. Anhand der HQ300 Karte sind betroffene Bereiche dargestellt.	\N
4	124be5f8-ca36-4127-86c0-27b7c2ff0b3b	2024-07-06 14:06:02.86693+00	2024-07-06 14:06:02.866956+00	K003	Sturm	Durch ein Sturmereignis kommt es zu Schäden der Infrastruktur sowie zu Schäden an Gebäuden. Durch das Ereignis kann es sein, das viele Objekte unbewohnbar werden, bzw. aufgrund der fehlenden Infrastrukur nicht benützt werden können.	\N
5	28c1273f-4b01-4380-b555-4caca67a212e	2024-07-06 16:02:24.429566+00	2024-07-06 16:02:24.429598+00	K004	Blackout	Durch einen großflächigen Stromausfall welcher länger als 24 Stunden anhält, entstehen einige Gefahren.	\N
6	ad0cbe47-4296-4486-82b5-162a20374a18	2024-07-06 16:02:56.579587+00	2024-07-06 16:02:56.579621+00	K005	Trinkwasserverseuchung	Durch eine Verunreinigung des Grund- und Trinkwassers kommt es zu einigen Gefahren.	\N
7	32fc432d-a2d9-4ee7-8a33-3308e73a9cbf	2024-07-06 16:03:47.173951+00	2024-07-06 16:03:47.173981+00	K006	Seuchenausbruch Menschen	Durch eine Pandemie kommt es zu vielen schweren Erkrankungen in der Bevölkerung. Spitäler nehmen keine Patienten mehr auf. Ein Feldlazarett mit Triage ist notwendig. Bevölkerung darf den Haushalt nicht verlassen.	\N
8	41ebad55-fb30-424d-89eb-d5f03d972488	2024-07-06 16:04:20.907451+00	2024-07-06 16:04:20.907485+00	K007	Seuchenausbruch Tiere	Durch eine Tierkrankheit kommt es zu einem großen Ausmaß an kranken Tieren. Möglichweiser mit einer Ansteckungsgefahr für Menschen. Notschalchtungen, Entsorgung von Tierkadavarn, in Bereichen der Haushalte oder auch in der Natur können die Folge sein. Großflächige Dekontaminationsmaßnahmen womöglich erforderlich.	\N
9	554f0a54-62cc-4a91-be16-e904698f8247	2024-07-06 16:05:40.492589+00	2024-07-06 16:05:40.492619+00	K008	Flugzeugabsturz im verbauten Gebiet	Durch einen Flugzeugabsturz im verbauten Gebiet, kommt es zu sehr großen Personen- und Infrastrukturschäden. Die Folgen können Großbrände, Eingestürzte bzw. schwer Beschädigte Objekte, zerstörte Verkehrs- und Energiewege.	\N
10	e30e77c6-5277-405a-aafe-6547a316b1b2	2024-07-06 16:06:40.410096+00	2024-07-06 16:06:40.410141+00	K009	Flugzeugabsturz im nicht verbauten Gebiet	Flugzeugabsturz in nicht verbautem Gebiet. Große Flächen- oder Waldbrände. Große Anzahl von Verletzten und Toten. Pressezentrum erforderlich. Trümmerhalle kurzfristig für Sichergestelltes Material.	\N
11	76317908-b432-4b24-bebc-e9b02b03bac4	2024-07-06 16:08:11.494876+00	2024-07-06 16:08:11.494912+00	K010	Erdbeben	Je nach stärke des Erbebens kann es zu schweren Schäden an Gebäuden und Infrastruktur kommen. Eine Vielzahl an Verletzten und Toten können auftreten. Anhand von Plänen und Rückmeldungen durch die Einsatzkräfte sind die Personen- , Gebäude- und Infrastrukturschäden aufzunehmen und darzustellen. Aus diesen Ergebnis der Erkundung werden die weiteren Gefahren und Maßnahmen abgeleitet.	\N
12	bd4e4392-f128-4789-ae01-ce37fffbecd8	2024-07-06 16:09:32.935258+00	2024-07-06 16:09:32.935291+00	K011	Isolierung Schneefall"	Infolge von starken Schneefällen kommt es zu einer Isolierung der Ortschaft. Durch die Isolierung können mehrere Gefahren auftreten und Maßnahmen notwendig werden.	\N
13	7ef321b9-fb16-45c0-bac3-4a2e6f8d8e3a	2024-07-06 16:10:16.659571+00	2024-07-06 16:10:16.659603+00	K012	Chemieunfall	Durch einen Chemieunfall auf der Strasse/Schiene oder durch einen Zwischenfall in einem örtlichen Betrieb kann es schwerwiegende Folgen für die Umgebung, Ortsteile bzw. den ganzen Ort geben.	\N
14	33a15795-3b35-433b-abd5-6d275c6390ca	2024-07-06 16:10:57.818579+00	2024-07-06 16:10:57.818609+00	K013	Terroranschlag	Durch einen Terroranschlag kann es...	\N
\.


--
-- Data for Name: katastrophen_katgefahren; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.katastrophen_katgefahren (id, gef_id_id, kat_id_id) FROM stdin;
1	2	2
2	3	2
3	6	2
4	11	2
5	13	2
6	1	3
7	2	3
8	3	3
9	4	3
10	5	3
11	8	3
12	9	3
13	12	3
14	13	3
15	1	4
16	2	4
17	4	4
18	9	4
19	11	4
20	12	4
21	13	4
22	1	5
23	2	5
24	3	5
25	4	5
26	5	5
27	6	5
28	9	5
29	13	5
30	2	6
31	3	6
32	13	6
33	1	7
34	2	7
35	11	7
36	13	7
37	10	8
38	13	8
39	1	9
40	2	9
41	4	9
42	11	9
43	12	9
44	4	10
45	11	10
46	12	10
47	1	11
48	2	11
49	3	11
50	4	11
51	5	11
52	8	11
53	9	11
54	10	11
55	11	11
56	12	11
57	13	11
58	1	12
59	2	12
60	4	12
61	6	12
62	7	12
63	9	12
64	12	12
65	13	12
66	1	13
67	2	13
68	3	13
69	11	13
70	12	13
71	13	13
72	1	14
73	2	14
74	9	14
75	11	14
76	13	14
\.


--
-- Data for Name: katastrophen_katmassnahmen; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.katastrophen_katmassnahmen (id, kat_id_id, mas_id_id) FROM stdin;
\.


--
-- Data for Name: katastrophen_katrollen; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.katastrophen_katrollen (id, kat_id_id, rol_id_id) FROM stdin;
1	9	10
2	10	10
\.


--
-- Data for Name: konfiguration_konfiguration; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.konfiguration_konfiguration (pkid, id, created_at, updated_at, ort, plz) FROM stdin;
1	a856640d-db6c-4c2f-a2e6-70f41581055f	2024-02-26 21:59:04.644+00	2024-02-26 21:59:06.74+00	Schwadorf	2432
\.


--
-- Data for Name: kontakte_kontakt; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.kontakte_kontakt (pkid, id, created_at, updated_at, kuerzel, name, funktion, telefon, telefon2, telefon3, email, kategorie) FROM stdin;
1	522d8311-47a1-4d80-96f4-3450c246baa3	2024-03-01 22:20:47.361+00	2024-03-01 22:21:53.714+00	C001	Michael Reichenauer	Administrator	06767790686			office@michael-web.at	
2	0b64eeb3-192f-4abf-b064-9943a5fd9204	2024-03-01 22:21:12.005+00	2024-03-01 22:22:00.875+00	C002	Jürgen Maschl	Bürgermeister	06648834852			juergen.maschl@schwadorf.gv.at	
3	b5c2d7b2-b8bc-4827-989c-4deaf3d697e4	2024-03-01 22:21:39.321+00	2024-03-01 22:21:39.322+00	C003	Wolfgang Niederauer	Feuerwehrkommandant	06505055122			wolfgang.niederauer@feuerwehr.gv.at	
4	219b02cf-944a-41f8-8c14-d1fb66fdd204	2024-03-01 22:22:45.045+00	2024-03-01 22:22:45.045+00	C004	Wolfgang Janosi	Leiter Wirtschaftshof	06767013925			wolfgang.janosi@schwadorf.gv.at	
5	7e582593-0c23-4b04-8a40-ea3fb3826b8c	2024-03-01 22:23:13.14+00	2024-03-01 22:23:13.14+00	C005	Harald Wolf	Feuerwehrkommandant Stv.	06649203836			harry.wolf@gmx.at	
6	5a3132ee-a580-49a5-b6f5-6fad44176b58	2024-03-01 22:23:38.351+00	2024-03-01 22:23:38.351+00	C006	Gustav Weber	Vizebürgermeister	06643119356			gustav.weber@schwadorf.gv.at	
7	0fe4c9a0-438a-4206-bb70-1003c41a08a9	2024-03-13 11:11:03.444+00	2024-03-13 11:11:03.444+00	C007	Bezirkspolizeikommando Bruck a. d. Leitha		0591333320305			bpk-n-bruck-an-der-leitha@polizei.gv.at	
8	7e2eab7c-8481-44f3-96ff-33d97ee05ae1	2024-03-13 11:11:48.44+00	2024-03-13 11:11:48.441+00	C008	Herber Spreitzer	Chefinspektor Polizeiinspektion Fischamend	0591333222100			pi-n-fischamend@polizei.gv.at	
9	13bc088f-e49a-4181-9e63-654863a7835c	2024-03-13 13:19:38.427+00	2024-03-13 13:19:38.427+00	C009	Mag. Markus Palkowitz		06646214861				
10	38b3edf6-b0f9-46ee-b4d0-73d728e42d12	2024-03-13 13:19:49.838+00	2024-03-13 13:19:49.838+00	C010	Rotes Kreuz Bezirksstelle Schwechat	05914477000					
11	7037aafb-82d5-4ce0-9c98-6176b9ee9e14	2024-03-13 13:20:23.067+00	2024-03-13 13:20:23.067+00	C011	Ing. Kirschka Michael	Kommandant RK	06644349639				
12	4a87727a-78c6-428c-b5ef-687fd87b9637	2024-03-13 13:20:35.202+00	2024-03-13 13:20:35.202+00	C012	Wiener Netze		05012810100				
13	7fc7eb92-fd34-469f-99c9-bf4f79e949d4	2024-03-13 13:20:50.482+00	2024-03-13 13:20:50.482+00	C013	Wasser-Zentrale Südstadt		02236446010				
14	295dcbb6-63b9-4140-a33f-c5cf005bbded	2024-03-13 13:21:02.148+00	2024-03-13 13:21:02.148+00	C014	EVN Wasser-Kundenzentrum		022522000				
15	2e544418-276c-4557-b9c2-997113f83381	2024-03-13 13:21:36.354+00	2024-03-13 13:21:36.354+00	C015	EVN Gas		022362000				
16	b35c9dfa-e8fb-4239-8ee0-b41b257c9834	2024-03-13 13:22:09.345+00	2024-03-13 13:22:09.345+00	C016	Gani Rexhaj	Leiter Wirtschaftshof Stv.	06765234524				
17	8b5eb0f8-375e-48bb-9f40-3fcd57acc3ef	2024-03-13 13:22:40.295+00	2024-03-13 13:22:40.295+00	C017	Gerlinde Stadler		02230228811			324112@noeschule.at	
18	d42f4b17-010d-498a-9b19-608893b74d0b	2024-03-13 13:23:00.563+00	2024-03-13 13:23:00.563+00	C018	Sabine Maleschitz		022302265			5324231@noeschule.at	
19	c8adb413-e889-4879-8e25-3929a872545c	2024-03-13 13:23:20.207+00	2024-03-13 13:23:20.207+00	C019	Birgit Zethner	Amtsleiterin	067640707093			birgit.zethner@schwadorf.gv.at	
20	7c387b78-d17f-4ccb-92a7-7fc6acdcbab6	2024-03-13 13:23:47.208+00	2024-03-13 13:23:47.208+00	C020	Ing. Isabella Müllner	Amtsleiterin Stv. / Leiterin Bauamt	06767314492			isabella.muellner@schwadorf.gv.at	
21	58b8d59a-03cb-488d-9550-563fe8d8db35	2024-03-13 13:24:06.466+00	2024-03-13 13:24:06.466+00	C021	Ing. Christian Staller	GFGR	0676844121217			christian.staller@schwadorf.gv.at	
22	0ac6dc19-9b42-4676-a923-d3e493eb5237	2024-03-13 13:24:23.66+00	2024-03-13 13:24:23.66+00	C022	Brigitte Richter	S1 und S4	066488399320				
23	a10822ab-9379-4255-9c8c-fdfa1228f382	2024-03-13 13:24:44.369+00	2024-03-13 13:24:44.369+00	C023	Christiane Amsüss	S1 und S4	06764977803				
24	ae2b7b96-46b4-41f6-aa8c-5402ce9810a9	2024-03-13 13:25:01.718+00	2024-03-13 13:25:01.718+00	C024	Eveline Prokopp	S1 und S4	06505546408				
25	fea08f9d-376e-436c-9edc-21b3133c3885	2024-03-13 13:25:36.544+00	2024-03-13 13:25:36.545+00	C025	Josef Baumgartner	S2 und S3	06648355409				
26	6ff8ab11-406c-43e6-ae75-df938f798628	2024-03-13 13:25:52.872+00	2024-03-13 13:25:52.872+00	C026	Willibald Friedrich	S2 und S3 / Techniker EMS bzw. Hallenbad	06601964426				
27	bbd48725-9e4e-49ad-8721-c7f177544de5	2024-03-13 13:26:10.707+00	2024-03-13 13:26:10.707+00	C027	Melanie Strauby	S5 und S6	06767900760				
29	e4b6411a-451e-4e21-a243-440b21c72f0c	2024-03-13 13:27:07.551+00	2024-03-13 13:27:07.551+00	C029	AIRSIDE OPERATIONS	Flugplatzbetriebsleitung	01700722353			airsideoperationscenter@viennaairport.com	
30	0f4ef735-123e-48c8-93c1-74c804eef55d	2024-03-13 13:27:30.986+00	2024-03-13 13:27:30.986+00	C030	Austro Control	Luftraumüberwachung	01700732262			loww.tower@austrocontrol.at	
31	50db7c45-da57-43e2-a8d8-cb84ecbb8dab	2024-03-13 13:27:45.934+00	2024-03-13 13:27:45.934+00	C031	Zijadin Rexhaj	Schulwart EMS	06765234527				
32	b1d093f5-ae4c-4513-893e-c273c07926fc	2024-03-13 13:28:24.023+00	2024-03-13 13:28:24.023+00	C032	Marko Lubina	Schulwart Volksschule	06765234526				
33	7e70bc22-6006-4547-8262-96b023b99464	2024-03-13 13:29:00.184+00	2024-03-13 13:29:00.184+00	C033	Dr. Claudia Ertl	Gemeindeärztin	069911855105	022302142			
34	3c1e7fae-cced-47a3-a6cd-b5fc4686418d	2024-03-13 13:29:22.722+00	2024-03-13 13:29:22.722+00	C034	ÖBB Notfallkoordinator	ÖBB Notfallkoordinator	019300054530			notfall@oebb.at	
35	a2a47f83-330e-4d57-bc2d-06d63fbf509f	2024-03-13 13:32:57.486+00	2024-03-13 13:32:57.486+00	C035	August Kugler - Postbus AG	Regionalmagament Ost, Verkehrsleitung Vösendorf, Verkehrsplaner	06646243219			august.kugler@postbus.at	
36	4308157f-daa7-4693-bb44-67f2f004649d	2024-03-13 14:24:54.857+00	2024-03-13 14:24:54.857+00	C036	Strassenmeisterei Bruck	Strassenmeisterei	02162902523450			post.strm.bruck@noel.gv.at	
37	74454f13-88d6-4c87-ad51-62ae4d081e4e	2024-03-13 14:25:14.023+00	2024-03-13 14:25:14.023+00	C037	Felix Böhm (Strm)	Strassenmeister	0676812620311			felix.boehm@noel.gv.at	
38	44bb1479-3933-4a1b-8e30-31520278b33e	2024-03-13 14:25:40.303+00	2024-03-13 14:25:40.303+00	C038	Markus Reisacher (Strm.Stv.)	Strassenmeister Stellvertreter	067681220312			markus.reisacher@noel.gv.at	
39	2a9630d5-9213-44f1-830d-5f34524318d4	2024-03-13 14:26:17.486+00	2024-03-13 14:26:17.486+00	C039	Wasserrechtsbehörde NÖ	Wasserrechtsbehörde NÖ	02742900514440			post.wa1@noel.gv.at	
40	dfc6d7f0-f6d7-4169-a048-443f5aa21628	2024-03-13 14:26:39.38+00	2024-03-13 14:26:39.38+00	C040	Robert Amon (BH Wasser)	Wasserrechtsbehörde BL	067681223288			robert.amon@noel.gv.at	
41	b50a2a3b-4389-4dc7-8bd0-eaca342857d6	2024-03-13 14:26:55.321+00	2024-03-13 14:26:55.321+00	C041	STAB - MELDEKOPF	STAB Meldekopf - Einsatzleitung					
42	1422f680-7a3e-476c-b7ca-19069ecfc791	2024-03-13 14:27:19.81+00	2024-03-13 14:27:19.81+00	C042	Landeswarnzentrale Tulln	LWZ	+43 2272900517374			n-lwz@feuerwehr.or.at	
43	34d304e4-4586-4ea4-8e42-794d5316b777	2024-03-13 14:27:49.609+00	2024-03-13 14:27:49.609+00	C043	Bezirkshauptmannschaft Bruck/Leitha	Behördlicher Einsatzleiter	02162 90250	0676 81223111		post.bhbl@noel.gv.at	
44	31d3eb46-ad8e-4501-84aa-fe99f41f63eb	2024-03-13 14:38:11.238+00	2024-03-13 14:38:11.238+00	C044	EVN Gas	Betriebstelle Bruck a.d. Leitha	021626090				
\.


--
-- Data for Name: massnahmen_masfahrzeuge; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.massnahmen_masfahrzeuge (id, fah_id_id, mas_id_id) FROM stdin;
1	8	18
2	9	18
3	10	18
4	14	18
5	18	18
6	1	3
7	4	3
8	5	3
9	1	5
10	4	5
11	2	7
12	3	7
13	8	8
14	18	8
15	2	21
16	3	21
17	4	21
18	1	26
19	4	26
20	6	26
21	7	26
22	2	28
23	3	28
24	2	29
25	3	29
26	4	29
27	8	31
28	13	31
29	8	34
30	11	34
31	12	34
32	17	34
33	18	34
34	1	40
\.


--
-- Data for Name: massnahmen_maskontakte; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.massnahmen_maskontakte (id, kon_id_id, mas_id_id) FROM stdin;
1	2	18
2	4	18
3	16	18
4	4	2
5	16	2
6	3	3
7	5	3
8	4	4
9	16	4
10	3	5
11	5	5
12	3	7
13	5	7
14	4	8
15	16	8
16	3	10
17	5	10
18	4	11
19	16	11
20	4	12
21	16	12
22	3	13
23	5	13
24	4	14
25	16	14
26	41	15
27	4	16
28	16	16
29	41	17
30	4	19
31	16	19
32	3	20
33	5	20
34	3	21
35	5	21
36	23	22
37	24	22
38	9	23
39	10	23
40	11	23
41	25	23
42	26	23
43	31	23
44	23	24
45	24	24
46	25	25
47	26	25
48	3	26
49	4	26
50	5	26
51	16	26
52	25	27
53	26	27
54	3	28
55	5	28
56	3	29
57	5	29
58	25	32
59	26	32
60	25	33
61	26	33
62	25	34
63	26	34
64	4	36
65	16	36
66	25	38
67	26	38
68	2	39
69	41	39
70	3	40
71	5	40
72	2	41
73	41	41
74	2	42
75	41	42
76	2	43
77	41	43
\.


--
-- Data for Name: rollen_rollekontakterreichbarkeit; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.rollen_rollekontakterreichbarkeit (id, kon_id_id, rol_id_id) FROM stdin;
1	43	1
2	1	2
3	3	2
4	5	2
5	2	3
6	6	3
7	19	4
8	20	4
9	21	4
10	22	4
11	23	4
12	24	4
13	25	4
14	26	4
15	27	4
17	7	5
18	8	5
19	9	6
20	10	6
21	11	6
22	12	7
23	13	8
24	14	8
25	15	9
26	44	9
27	29	10
28	30	10
29	4	11
30	16	11
31	17	12
32	26	12
33	31	12
34	18	13
35	26	13
36	32	13
37	33	14
\.


--
-- Data for Name: rollen_rollekontaktverstaendigung; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.rollen_rollekontaktverstaendigung (id, kon_id_id, rol_id_id) FROM stdin;
1	2	2
2	4	2
3	2	4
4	6	4
5	41	7
6	41	8
7	41	9
8	41	10
9	41	11
10	41	12
11	41	13
12	41	14
13	41	15
14	41	16
15	41	17
16	41	18
17	41	21
\.


--
-- Data for Name: users_user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users_user (password, last_login, is_superuser, pkid, id, first_name, last_name, username, email, is_staff, is_verwaltung, is_active, date_joined) FROM stdin;
argon2$argon2id$v=19$m=102400,t=2,p=8$RG50NDZjZHdJNGNNamVQcXNKZEQzeQ$lYSC1yZql4nr3kBlg23AqwtungBdvHfdD4Oe2rZ06so	2024-11-08 07:00:12.774478+00	f	3	3030d399-aceb-442d-81dd-7943ae74e32b	Isabella	Müllner	Bauamt		t	t	t	2024-07-08 12:11:38.690573+00
argon2$argon2id$v=19$m=102400,t=2,p=8$Uml6S3J5UHN3UjlrR1U4anl2V3dvTQ$p4Zx8DfX6MzvRf+Oe0c4pJl1JWqg16cMQ2C17BiWKw0	2025-03-06 21:21:23.433284+00	t	1	1e5ef3f7-7677-48a9-95fd-d3af059e1a1f	Michael	Reichenauer	admin	\N	t	t	t	2024-02-26 21:55:10.33+00
argon2$argon2id$v=19$m=102400,t=2,p=8$QkZYcmoyQ2N2SjRDaFd2MG1jdVJWbg$KXNkTlJUi1KjRiaP066nTMMnyKi3Pt+yq182qBEGb9U	2024-07-08 11:32:31.02061+00	f	2	09195ec1-fd91-413f-b76f-64f8dc92a499	Wolfgang	Niederauer	niederauer		t	t	t	2024-07-06 16:20:04.228412+00
\.


--
-- Data for Name: users_user_groups; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: users_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Name: dokumente_dokument_pkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.dokumente_dokument_pkid_seq', 4, true);


--
-- Name: fahrzeuge_fahrzeug_pkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.fahrzeuge_fahrzeug_pkid_seq', 19, true);


--
-- Name: gefahren_gefahr_pkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.gefahren_gefahr_pkid_seq', 13, true);


--
-- Name: gefahren_gefdokumente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.gefahren_gefdokumente_id_seq', 1, false);


--
-- Name: gefahren_gefmassnahmen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.gefahren_gefmassnahmen_id_seq', 76, true);


--
-- Name: gefahren_gefrollen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.gefahren_gefrollen_id_seq', 98, true);


--
-- Name: kat_material_katmaterial_pkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.kat_material_katmaterial_pkid_seq', 10, true);


--
-- Name: katastrophen_katastrophe_pkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.katastrophen_katastrophe_pkid_seq', 14, true);


--
-- Name: katastrophen_katgefahren_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.katastrophen_katgefahren_id_seq', 76, true);


--
-- Name: katastrophen_katmassnahmen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.katastrophen_katmassnahmen_id_seq', 1, false);


--
-- Name: katastrophen_katrollen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.katastrophen_katrollen_id_seq', 2, true);


--
-- Name: konfiguration_konfiguration_pkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.konfiguration_konfiguration_pkid_seq', 1, true);


--
-- Name: kontakte_kontakt_pkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.kontakte_kontakt_pkid_seq', 44, true);


--
-- Name: massnahmen_masfahrzeuge_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.massnahmen_masfahrzeuge_id_seq', 34, true);


--
-- Name: massnahmen_maskontakte_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.massnahmen_maskontakte_id_seq', 77, true);


--
-- Name: massnahmen_massnahme_pkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.massnahmen_massnahme_pkid_seq', 43, true);


--
-- Name: rollen_rolle_pkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.rollen_rolle_pkid_seq', 23, true);


--
-- Name: rollen_rollekontakterreichbarkeit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.rollen_rollekontakterreichbarkeit_id_seq', 37, true);


--
-- Name: rollen_rollekontaktverstaendigung_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.rollen_rollekontaktverstaendigung_id_seq', 17, true);


--
-- Name: users_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_groups_id_seq', 1, false);


--
-- Name: users_user_pkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_pkid_seq', 3, true);


--
-- Name: users_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_user_permissions_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

