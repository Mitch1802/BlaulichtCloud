--
-- PostgreSQL database dump
--

-- Dumped from database version 15.11 (Debian 15.11-1.pgdg110+1)
-- Dumped by pg_dump version 15.11 (Debian 15.11-1.pgdg110+1)

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
1	237e081a-4d78-42d0-b958-c15b3c96357b	2024-10-04 09:41:05.219508+00	2025-01-21 22:07:52.047466+00	D001	Wasserleitungsplan	dokumente/237e081a-4d78-42d0-b958-c15b3c96357b.pdf	0	
2	4c0896d4-9f41-4f1f-9b89-37ef4c99b231	2024-10-04 09:41:18.594641+00	2025-01-21 22:08:08.200116+00	D002	Infopoints	dokumente/4c0896d4-9f41-4f1f-9b89-37ef4c99b231.pdf	0	
3	84eaefc0-027a-4432-98b3-d49392ec85f9	2024-10-04 09:41:29.971989+00	2025-01-21 22:08:21.377749+00	D003	Stadtkarte	dokumente/84eaefc0-027a-4432-98b3-d49392ec85f9.pdf	0	
4	cde334f8-8c56-4203-a351-41e2d24039c9	2024-10-04 09:41:40.321087+00	2025-01-21 22:08:37.28431+00	D004	Hochwasserkarte	dokumente/cde334f8-8c56-4203-a351-41e2d24039c9.pdf	0	
\.


--
-- Data for Name: fahrzeuge_fahrzeug; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.fahrzeuge_fahrzeug (pkid, id, created_at, updated_at, kuerzel, name, foto, fahrzeug, anhaenger, type, lenkerberechtigung, stationierung, personenkapazitaet, treibstoff, nutzlast, ladebordwand, ladekran, wassertank, "wassertankAbnehmbar", "geschlossenerAufbau", sonderausstattung, anhaengervorrichtung, kategorie, reihenfolge) FROM stdin;
6	f54ebb58-0d71-4e29-b1db-2d9f87e74ec6	2024-10-04 09:35:28.652909+00	2025-01-21 22:06:40.596596+00	F001	Gemeindefahrzeug	fahrzeuge/f54ebb58-0d71-4e29-b1db-2d9f87e74ec6.png	t	f		B	Wirtsschaftshof	9	Diesel	0	f	f		f	f				0
7	f34248d9-a3a3-4df2-8f39-68c00a172abb	2024-10-04 09:36:58.411002+00	2025-01-21 22:06:57.327127+00	F002	Unimog	fahrzeuge/f34248d9-a3a3-4df2-8f39-68c00a172abb.jpg	t	f	Mercedes	C	Wirtschaftshof	2	Diesel	500	f	f		f	f				0
8	e263f498-1432-4319-aa44-7cbc43d60b84	2024-10-04 09:37:33.481821+00	2025-01-21 22:07:12.045085+00	F003	Anhänger	fahrzeuge/e263f498-1432-4319-aa44-7cbc43d60b84.jpg	f	t	Kipper	E	Wirtschaftshof	0		1500	f	f		f	f				0
\.


--
-- Data for Name: gefahren_gefahr; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.gefahren_gefahr (pkid, id, created_at, updated_at, kuerzel, name, beschreibung, ausloeser, "feld1Name", "feld1Value", "feld2Name", "feld2Value", "feld3Name", "feld3Value", "feld4Name", "feld4Value", "feld5Name", "feld5Value", folgen, gefahren, reihenfolge) FROM stdin;
1	c62d9576-29db-422e-9fb6-510785a8eb30	2024-10-04 10:07:21.301453+00	2024-10-04 10:07:21.301469+00	G001	Notunterkunft für Bevölkerung	Aufgrund eines Ereignisses ist eine Notunterkunft für die Bevölkerung notwendig.	Brand (Unbenützbarkeit), Unwetter (Sturm, Wasser), Erdbeben, Ausfall Strom, Ausfall Heizung, Explosion.	Hotel1 Kapazität	50 Personen	Mehrzweckhalle Kapazität	600 Personen							Notversorgung mit Nahrung, Kleidung, Dokumenten	Plünderungen, Gefahr durch unbeobachtete Infrastruktur (Stromabschaltungen veranlassen), Verlust Wertgegenstände/Dokumente	\N
2	3f4c32f8-3503-4ec1-ab1a-1cf5cf71b906	2024-10-04 10:08:16.1021+00	2024-10-04 10:08:16.102112+00	G002	Notversorgung für Bevölkerung (Essen/Getränke)	Es besteht keine Möglichkeit der Eigenversorgung mit Nahrung	Verlust Eigenheim, Ausfall Versorgung, Ausfall Energie, Keine Kochmöglichkeit, Grundwasserverunreinigung											Über längeren Zeitraum: Genaue Rationenplanung (Melderegister)	Allergien und Unverträglichkeiten, Zugangskontrollen können erforderlich sein.	\N
3	870badf5-e2a2-480b-b1f7-fa7c504b489c	2024-10-04 10:09:13.652698+00	2024-10-04 10:09:13.65271+00	G003	Ausfall Trink- und Nutzwasser	Durch ein Ereignis muss der gesamte Ort oder Ortsteile bzw. Objekte mit Nutzwasser versorgt werden.	Leitungsbruch, Verunreinigung	Zuständige Firma Wassernetz	EVN									Gesundheitliche Beeinträchtigung (Hygiene, Keime,...)		\N
4	79b74500-2d7e-4f20-ad64-ff81d01e95d7	2024-10-04 10:10:06.438417+00	2024-10-04 10:10:06.438429+00	G004	Ausfall Strom	Ort oder Ortsteile stromlos	Blackout, Erdbeben, Explosion, Brand											Längerer Zeitraum: Ausfall Heizung und Warmwasser, keine Kochmöglichkeit.	Notversorgung und Notunterkunft erforderlich	\N
5	65bfca52-2905-49e7-9f5c-2d3ca1edca52	2024-10-04 10:14:13.059922+00	2024-10-04 10:14:13.059934+00	G005	Ausfall Nahrungsversorgung	Durch Isolation oder Versorgungsengpass ist keine Nahversorgung möglich.	Schnee, Ausfall von Verbindungen, Ausfall Transporteure, Versorgungsengpass											Notversorgung der Bevölkerung	Plünderungen (Lager über- bzw. bewachen, Standort nicht veröffentlichen)	\N
6	e72de07f-8bc5-4414-b822-41b1d4ccd03b	2024-10-04 10:15:16.128163+00	2024-10-04 10:15:16.128175+00	G006	Plünderungen (Lager über- bzw. bewachen, Standort nicht veröffentlichen)	Ausfall der Kommunikation (Telefon, Internet). Ausfall Notrufnummern.	Blackout, Erdbeben	Infopoints	Siehe Dokument Infopoints									Keine Notfallmeldung möglich. Meldepunkte einrichten (Schnittstelle RK/FF schaffen)	Ungemeldete Gefahren, z.B. Brandfortschritt, verzögerter Rettungseinsatz	\N
7	0f16c90e-f2bd-42e3-bc76-64421a8d0928	2024-10-04 10:16:03.614809+00	2024-10-04 10:16:03.614821+00	G007	Ausfall Müllentsorgung	Ausfall der Abfallentsorgung - Grundsätzlich gedeckt durch Notfallplan der Entsorger.	Isolation, Streik											Seuchengefahr, Rattenplage		\N
8	4bba2308-56be-4f00-8ac7-bd6ee6f6bc98	2024-10-04 10:16:57.334204+00	2024-10-04 10:16:57.334217+00	G008	Massenanfall Tierkadaver	Infolge einer Tierseuche kommt es zu einen Massenanfall von Tierkadavern	Tierseuche, Vergiftung											Geruchsbelästigung, Dekontamination erforderlich	Seuchen- und Gesundheitsgefahr für Mensch und Tier	\N
9	276eed14-ebba-4507-8f8c-62e8a5070fa7	2024-10-04 10:17:31.729861+00	2024-10-04 10:17:31.729873+00	G009	Ausfall Verkehrsverbindungen	Durch ein unvorhersehbares Ereignis sind Straßen unpassierbar bzw. Zugverbindungen ausgefallen														\N
\.


--
-- Data for Name: gefahren_gefdokumente; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.gefahren_gefdokumente (id, dok_id_id, gef_id_id) FROM stdin;
1	3	1
2	2	2
3	1	3
4	2	4
5	2	5
6	2	6
7	3	6
8	2	7
9	3	7
\.


--
-- Data for Name: massnahmen_massnahme; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.massnahmen_massnahme (pkid, id, created_at, updated_at, kuerzel, name, beschreibung, kategorie, verantwortung, staerke, "feld1Name", "feld1Value", "feld2Name", "feld2Value", "feld3Name", "feld3Value", "feld4Name", "feld4Value", "feld5Name", "feld5Value", durchfuehrung, rueckbau, reihenfolge) FROM stdin;
4	454db02c-3153-43ba-8fb3-b68c6b6e54d1	2024-10-04 09:59:19.020988+00	2024-10-04 09:59:19.021+00	M001	Logistiktransport Bauhof	Mit den Fahrzeugen und Anhänger des Wirtschaftshofes, können verschiedene Logistiktransporte durchgeführt werden. Relevant ist ob das zu transportierende Material wettergeschützt oder offen transportiert werden kann.	G	Leiter Bauhof	0											Je nach Auftrag wird vom diensthabenden Wirtschaftshofleiter die erforderlichen Fahrzeuge und Besatzungen entsandt. \n\nRückmeldung nach Auftragserledigung an den Stab - Meldekopf	Reinigung - Dekontamination - Betankung\n\nRückmeldung der Einsatzbereitschaft an den Stab - Meldekopf.	\N
5	37120540-f09d-4e8a-8f6d-d97c641ed686	2024-10-04 09:59:53.920619+00	2024-10-04 09:59:53.920632+00	M002	Arbeitsleistung Bauhof	Personalarbeitseinsatz - keine Fahrzeuge notwendig. Der diensthabende Wirtschaftshofleiter meldet die mögliche Personalressource dem Stab-Meldekopf.	G	Diensthabender Wirtschaftshofleiter	0											Je nach Auftrag erfolgt die Rückmeldung ob dieser Auftrag personaltechnisch bewältigt werden kann oder weitere Ressourcen notwendig sind. \n\nRückmeldung wenn Auftrag durchgeführt ist.	Reinigung - (Arbeitskleidungstausch)\nDokumentation der eingesetzten Mitarbeiter inkl. Arbeitszeit. \n\nRückmeldung der Einsatzbereitschaft an den Stab-Meldekopf.	\N
6	74095af7-345f-4619-bfb7-7bcbcc284857	2024-10-04 10:00:32.716715+00	2024-10-04 10:00:32.716727+00	M003	Wasserversorgung (Nutzwasser) FF	Versorgung mit Nutzwasser durchgeführt mit den Löschfahrzeugen der Feuerwehr.	F	Einsatzleiter Feuerwehr	0											Die Wassermenge von insgesamt #### l steht grundsätzlich immer sofort zur Verfügung. \nEin Betankungsvorgang dauert bei funktionierenden Wassernetz ca. 10 Minuten (ohne Fahrzeit) \nDie Aufnahme von Wasser aus offenen Gewässer sollte aufgrund der Algenbildung im Tank vermieden werden.	Reinigung - Betankung Wasser - Betankung Treibstoff \nRückmeldung der Einsatzbereitschaft beim Stab-Meldekopf.	\N
7	720ab0b4-f5dd-42c0-8b3c-f903759ab772	2024-10-04 10:01:39.588326+00	2024-10-04 10:01:39.588337+00	M004	Notstromeinspeisung Gemeindeamt	Aktivierung der Notstromeinspeisung am Gemeindeamt. Einspeisung mit Notstrom Aggregate.	G	Diensthabender Wirtschaftshofleiter	0	Laufzeit ohne je Tankfüllung	5 h	Inbetriebnahmezeit	15 min							Transport der Notstrom Aggregate vom Wirtschaftshof zum Gemeindeamt.	Nachtanken\nRücktransport Notstrom Aggregat	\N
8	d7de0401-8466-4b91-ac44-299b39185550	2024-10-04 10:02:38.675284+00	2024-10-04 10:02:38.675295+00	M005	Kühlmöglichkeit Nahrung	Möglichkeiten zur Kühlung von Nahrungsmittel.	G	Diensthabender Wirtschaftshofleiter	0	Mögliche Lagerorte intern	Kühlzelle Feuerwehr, Kühlschränke Wirtschaftshof	Mögliche Lagerorte extern	Gasthäuser, Hotels							Einschaltzeit (je Möglichkeit unterschiedlich) berücksichtigen.		\N
9	2867a12e-8608-48ae-9d15-28690b96b88b	2024-10-04 10:03:40.252523+00	2024-10-04 10:03:40.252536+00	M006	Treibstoffversorgung - Extern	Tankmöglichkeiten bei Externen Betrieben oder Landwirten mit Haustankstellen.	E	Stab - S4 - Versorgung	0	Tankstelle	Bauer1	Mobile Tankstelle	Firma1							Aufzählung von Firmen mit Mobilen Tankstellen, Landwirte oder Betriebe mit Betriebstankstellen.		\N
10	68c13bb2-4a68-4875-8f92-0289a059ae29	2024-10-04 10:04:05.07915+00	2024-10-04 10:04:05.079163+00	M007	Notunterkunft für mehr als 20 Pers.	Unterbringung von mehr als 20 Personen. Örtliche Nächtigungsbetriebe. Überörtliche Nächtigungsbetriebe.	G	Stab - S3 - Einsatzmaßnahmen	0											Je nach Bedarf werden die erforderlichen Betten von den K-Lagern abgerufen. Von den jeweiligen geplanten Objekten ist der Verantwortliche zu verständigen. Pro Objekt übernimmt ein Leiter der Liegenschaft die Kommunikation mit dem Stab und weißt die Kräfte welche die Logistikaufgaben wahrnehmen ein. \n\nSobald die Liegenschaften bezugsfertig sind, ist das dem Stab - Meldekopf zu melden.		\N
11	66b8deb3-07f0-4f34-ae5e-1676304a339e	2024-10-04 10:04:27.354782+00	2024-10-04 10:04:27.354794+00	M008	Personentransport mehr als 30 Pers.	Personentransport von mehr als 30 Personen mit Mitteln von Personentransportunternehmen. (Busfirmen, Taxi)	E	Stab - S3 - Einsatzmaßnahmen	0													\N
12	7b358c28-a817-4ac1-8726-99d266d116af	2024-10-04 10:05:02.963964+00	2024-10-04 10:05:02.963986+00	M009	Sperre öffentliche Plätze	Sperren von öffentlichen Plätzen mittels Absperrband, Absperrgitter. (Spielplätze, Parks)	G	Diensthabender Wirtschaftshofleiter oder KAT-Team	0											Aufladen Absperrmaterialien\nDurchführung der Absperrung.\nDokumentation (Foto und Zeit der Sperre)\nMeldung an den Stab.	Rückbau der Absperrung und Versorgung. Meldung an den Stab.	\N
13	7b7e40cb-5651-4bf2-8c36-fcba33335e00	2024-10-04 10:05:38.700211+00	2024-10-04 10:05:38.700223+00	M010	Informationsverteilung Bevölkerung	Verteilung von Flugzetteln bzw. Infopoint Veranstaltungen.	G	Stab - S3 - Einsatzmaßnahmen / freiw. Helfer	0											Austragen von Postwurfsendungen durch freiwillige Helfer.\nBei Infopoints werden Aufsteller mit Informationen aufgestellt.	Einsammeln der Aufsteller. \nRückmeldung beim Stab.	\N
\.


--
-- Data for Name: gefahren_gefmassnahmen; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.gefahren_gefmassnahmen (id, gef_id_id, mas_id_id) FROM stdin;
1	1	10
2	1	11
3	2	6
4	2	8
5	3	4
6	3	6
7	4	7
8	5	8
9	6	7
10	6	13
11	7	5
12	8	5
\.


--
-- Data for Name: rollen_rolle; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.rollen_rolle (pkid, id, created_at, updated_at, kuerzel, name, beschreibung, notruf, aufgaben) FROM stdin;
1	882dd33b-9349-4982-89cc-af2c80bac99d	2024-10-04 09:44:23.519853+00	2024-10-04 09:44:23.519864+00	R001	Behördlicher Einsatzleiter	Der behördliche Einsatzleiter ist der Bezirkshauptmann. Er ist die oberste Instanz bei Katastrophen. Zu den Geschäftszeiten wird der Bezirkshauptmann über die Amtsleitung der BH verständigt. Ausserhalb der Geschäftszeiten erfolgt die Verständigung über die Polizei.	133	
2	aab2fbfb-6a28-46ce-a7af-c1f35dad7a61	2024-10-04 09:44:59.62368+00	2024-10-04 09:44:59.623691+00	R002	Einsatzleiter Feuerwehr	Der Einsatzleiter der Feuerwehr führt die Feuerwehreinsatzkräfte im Gemeindegebiet. Er ist für die Einsatzmaßnahmen der Feuerwehr zur Brandbekämpfung, technische Hilfeleistungen bei Gefahr im Verzug und Menschenrettung verantwortlich.	122	Gefahrenabwehr, Assistenzleistungen bei Bedarf. Der Einsatzleiter der Feuerwehr bedient sich an der Feuerwehreinsatzleitung und bildet im erforderlichen Fall einen Stab. Es besteht die Möglichkeit, dass der örtliche Feuerwehreinsatzleiter die Einsatzleitung der Feuerwehr an einem Funktionär des NÖLFV übergibt (Abschnitts-, Bezirks-, Landesfeuerwehrkommandant). Sofern Geräte, Personal oder Fahrzeuge aus dem Katastrophenhilfsdienst erforderlich sind, werden diese vom Einsatzleiter der Feuerwehr über das Bezirksfeuerwehrkommando bzw. die Landeswarnzentrale angefordert. Bei Bedarf wird ein Verbindungsoffizier der Feuerwehr zum Führungsstab der Gemeinde entsendet. Dieser ist mit Laptop, Telefon und Tetrafunkgerät ausgerüstet.
3	a7a0e6a3-0ed6-438f-ba6d-5f4397db6ebf	2024-10-04 09:45:38.134754+00	2024-10-04 09:45:38.134768+00	R003	Örtlicher Einsatzleiter (BGM)	Der örtliche Einsatzleiter ist der Bürgermeister. Sollte dieser verhindert sein vertritt ihn der Vizebürgermeister.		Der örtliche Einsatzleiter koordiniert sämtliche Maßnahmen welche von der Bezirksverwaltungsbehörde angeordnet wurden. Der örtliche Einsatzleiter kann sich an dem Führungsstab bedienen, welcher vom örtlichen Einsatzleiter in der notwendigen Stärke einberufen wird. Er hält Verbindung zur BH und gibt Rückmeldungen über die Lageentwicklung. Je nach Schadensszenario kann von den eingesetzten Einsatzorganisationen ein Verbindungsoffizier angefordert werden. Die Verständigung der Verbindungsoffiziere obliegt den Stabsmitarbeitern mit dem Hinweis "Verbindungsoffizier zum Stab entsenden". Weiters melden die eingesetzten Einsatzkräfte regelmäßig die Lageentwicklung. Sofern dies nicht selbstständig passiert, ist eine Lagemeldung bei den Einsatzorganisationen einzuholen.
4	f2cffe1f-107c-44c1-8455-d5d2a219e86f	2024-10-04 09:46:48.943094+00	2024-10-04 09:46:48.943106+00	R004	Stabsfunktionen S1 - S6	Stabsfunktionen S1 - S6. Meldekopf. Führen der Lage. Verständigungen. Dokumentation. Nachbereitung.		Nach der Verständigung wird der Stabsführungs- und Lageraum eingerichtet (Sitzungssaal Gemeindamt). \n\nDie S-Funktionen bereiten Ihre nötigen Hilfsmittel vor.
5	fde799a5-64fb-47b7-9d59-519049cd02f0	2024-10-04 09:47:11.98644+00	2024-10-04 09:47:11.986452+00	R005	Polizei	Es ist ein Verbindungsoffizier der Polizei als Unterstützung für die Stabsarbeit anzufordern.	133	Aufgaben laut definierten Hoheitsaufgaben. (Erhebung, Absicherung, Verständigungen).
6	e7985154-845d-480e-bbc8-69e115864dec	2024-10-04 09:47:37.391408+00	2024-10-04 09:47:37.391419+00	R006	Einsatzleiter Rettungsdienst	Es ist ein Verbindungsoffizier der Rettung als Unterstützung für den Stab anzufordern. Verständigung erfolgt durch den Stab.	144	
7	aaa86446-0f72-4651-bf9c-0ab89e0794ec	2024-10-04 09:47:55.490917+00	2024-10-04 09:47:55.490928+00	R007	Energieversorger Strom	Energieversorger Strom. Zuständig für die Stromversorgung.		Verantwortlich für Schadensbehebung bei Schäden an der Stromversorgung im öffentlichen Bereich.
8	5af62580-374c-4bb0-ba6b-d22131aa27b4	2024-10-04 09:48:12.283531+00	2024-10-04 09:48:12.283543+00	R008	Leiter Wirtschaftshof	Leitet den Wirtschaftshof.		Organisiert und Verständigt das Wirtschaftshofpersonal. Setzt die Maßnahmen um. Gibt Lagemeldungen an den Stab weiter.
9	3b946cc9-a8d7-43f7-9f96-05be233ad758	2024-10-04 09:48:28.10479+00	2024-10-04 09:48:28.104802+00	R009	Gemeindearzt	Ist für das Gesundheitswesen verantwortlich.		Kooperiert mit dem Stab und den Hilfskräften. Leitet mit dem RK das Feldlazarett.
10	3aebe11f-58f0-432e-8f65-49493ac06662	2024-10-04 09:48:47.617177+00	2024-10-04 09:48:47.617189+00	R010	Vorregion Busverkehr	Verkehrsplanung, Verkehrsleitung		Ausweichstrecken für Busse. Beistellung von Transportmitteln.
\.


--
-- Data for Name: gefahren_gefrollen; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.gefahren_gefrollen (id, gef_id_id, rol_id_id) FROM stdin;
1	1	3
2	1	4
3	2	3
4	2	4
5	2	8
6	3	2
7	3	3
8	3	4
9	4	3
10	4	7
11	5	3
12	5	4
13	6	3
14	6	4
15	7	3
16	7	4
17	8	3
18	8	4
19	8	5
20	9	10
\.


--
-- Data for Name: kat_material_katmaterial; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.kat_material_katmaterial (pkid, id, created_at, updated_at, artikel, bemerkung, menge, stationierungsort) FROM stdin;
1	b6c48322-6f77-4069-b009-2835bd5fde42	2024-10-03 19:51:14.023662+00	2024-10-04 09:38:53.201642+00	Feldbetten		200	K-Lager
2	545cee99-735d-4926-996f-7af88dd88387	2024-10-04 09:39:11.127948+00	2024-10-04 09:39:11.127959+00	Heizgeräte	Mobil auf Rollen	10	Wirtschaftshof
3	fa5beee7-b752-454d-930a-a0ab5f09cd0e	2024-10-04 09:39:27.37468+00	2024-10-04 09:39:27.374691+00	Masken FFP2		3000	Gemeinde
4	b59424c7-9f57-4885-8933-9b5f7981d167	2024-10-04 09:39:49.518902+00	2024-10-04 09:39:49.518914+00	Sandsäcke	Leer, Sand für Füllung über externe Firma	500	Feuerwehrhaus
\.


--
-- Data for Name: katastrophen_katastrophe; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.katastrophen_katastrophe (pkid, id, created_at, updated_at, kuerzel, name, beschreibung, reihenfolge) FROM stdin;
2	b2056bbe-283f-4c2d-aeea-72463fe06549	2024-10-04 10:20:26.127437+00	2024-10-04 10:20:26.127449+00	K002	Hochwasser	Durch hohe Niederschlagsmengen kann es zu Überflutungen kommen. Anhand der HQ300 Karte sind betroffene Bereiche dargestellt.	\N
3	82ff383e-bc90-4d12-97a6-6f36081d9284	2024-10-04 10:21:39.76688+00	2024-10-04 10:21:39.766891+00	K003	Sturm	Durch ein Sturmereignis kommt es zu Schäden der Infrastruktur sowie zu Schäden an Gebäuden. Durch das Ereignis kann es sein, das viele Objekte unbewohnbar werden bzw. aufgrund der fehlenden Infrastrukur nicht benützt werden können.	\N
4	8292b9ba-7e32-4927-b4d3-684c52eb44dc	2024-10-04 10:23:06.609482+00	2024-10-04 10:23:06.609494+00	K004	Blackout	Durch einen großflächigen Stromausfall, welcher länger als 24 Stunden anhält, entstehen einige Gefahren.	\N
5	1c775c99-7985-4c97-a487-f623cd3be6c5	2024-10-04 10:23:49.947005+00	2024-10-04 10:23:49.947016+00	K005	Trinkwasserverseuchung	Durch eine Verunreinigung des Grund- und Trinkwassers kommt es zu einigen Gefahren.	\N
6	c58316e5-6303-4062-9db1-5c46452ec012	2024-10-04 10:24:11.945623+00	2024-10-04 10:24:11.945635+00	K006	Seuchenausbruch Tiere	Eine größere Anzahl an Tieren erleiden eine ansteckende Krankheit. Es sind Maßnahmen zu treffen, die eine weitere Ausbreitung verhindern	\N
7	768a65b2-9703-4ab7-aaaf-d79f508509ab	2024-10-04 10:25:21.223123+00	2024-10-04 10:25:21.223135+00	K007	Isolierung Schneefall	Infolge von starken Schneefällen kommt es zu einer Isolierung der Ortschaft. Durch die Isolierung können mehrere Gefahren auftreten und Maßnahmen notwendig werden.	\N
8	a4947c2b-0f18-49d7-90a1-943bd7aec344	2024-10-04 10:29:45.210645+00	2024-10-04 10:29:45.210657+00	K008	Erdbeben	Je nach stärke des Erbebens kann es zu schweren Schäden an Gebäuden und Infrastruktur kommen. Eine Vielzahl an Verletzten und Toten können auftreten. Anhand von Plänen und Rückmeldungen durch die Einsatzkräfte sind die Personen- , Gebäude- und Infrastrukturschäden aufzunehmen und darzustellen. Aus diesen Ergebnis der Erkundung werden die weiteren Gefahren und Maßnahmen abgeleitet.	\N
9	a2bd1d75-d6f9-47dd-85d2-d28cb2f49124	2024-10-04 10:31:00.240801+00	2024-10-04 10:31:00.240812+00	K009	Terroranschlag	Durch einen Terroranschlag kann es zu einigen Gefahren kommen.	\N
10	76849ffe-8fbb-4275-92cc-93b65f762762	2024-10-04 10:31:12.430175+00	2024-10-04 10:31:12.430186+00	K010	Seuchenausbruch Menschen	Eine größere Anzahl an Menschen erleiden eine ansteckende Krankheit. Es sind Maßnahmen zu treffen, die eine weitere Ausbreitung verhindern	\N
11	fa3a36cb-6e38-4add-8cbb-23481c4191c6	2024-10-04 10:31:24.359544+00	2024-10-04 10:31:24.359555+00	K011	Flugzeugabsturz in verbautem Gebiet	In verbautem Ortsgebiet ist ein Flugzeug abgestürzt. Es sind Menschen getötet bzw. schwer verletzt worden.	\N
12	d83479a5-17bf-4ec9-a233-1012f9504899	2024-10-04 10:31:36.463903+00	2024-10-04 10:31:36.46393+00	K012	Flugzeugabsturz in unverbautem Gebiet	Es ist ein Flugzeug in unverbautem Gebiet abgestürzt. Es sind Menschen getötet bzw. schwer verletzt worden	\N
13	b35fa4ab-933c-4260-8059-56cf5d50c9a0	2024-10-04 10:31:50.467947+00	2024-10-04 10:31:50.467958+00	K013	Chemieunfall	Gefährliche Chemikalien sind ausgetreten. Es besteht Gefahr für die Gesundheit von Menschen	\N
1	d80e4637-7873-4355-846a-d8d4547a9c62	2024-10-03 21:06:18.868863+00	2024-12-05 20:32:09.977328+00	K001	Radioaktive Verstrahlung	Eine radioaktive Verstrahlung kann insbesondere durch Niederschlag, aber auch durch die Luft übertragen werden. Es kann möglich sein, dass die Bevölkerung die Wohneinheiten über einen längeren Zeitraum nicht verlassen dürfen.	\N
\.


--
-- Data for Name: katastrophen_katgefahren; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.katastrophen_katgefahren (id, gef_id_id, kat_id_id) FROM stdin;
1	2	1
2	3	1
3	5	1
4	8	1
5	1	2
6	2	2
7	3	2
8	4	2
9	5	2
10	1	3
11	2	3
12	3	3
13	4	3
14	5	3
15	6	3
16	2	4
17	3	4
18	4	4
19	5	4
20	6	4
21	2	5
22	3	5
23	2	7
24	3	7
25	4	7
26	5	7
27	6	7
28	7	7
29	1	8
30	2	8
31	3	8
32	4	8
33	5	8
34	6	8
35	8	8
36	1	9
37	2	9
38	4	9
39	6	9
40	8	9
\.


--
-- Data for Name: katastrophen_katmassnahmen; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.katastrophen_katmassnahmen (id, kat_id_id, mas_id_id) FROM stdin;
1	1	4
2	1	6
3	1	8
4	1	10
5	1	11
6	2	4
7	2	5
8	2	10
9	3	4
10	3	5
11	3	6
12	3	7
13	3	10
14	3	12
15	4	4
16	4	5
17	4	6
18	4	7
19	4	9
20	4	13
21	5	4
22	5	5
23	5	6
24	7	4
25	7	5
26	7	7
27	7	9
28	7	10
29	7	13
30	8	4
31	8	5
32	8	6
33	8	7
34	8	8
35	8	9
36	8	10
37	8	11
38	8	12
39	8	13
40	9	6
41	9	7
42	9	8
43	9	11
44	9	12
45	9	13
\.


--
-- Data for Name: katastrophen_katrollen; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.katastrophen_katrollen (id, kat_id_id, rol_id_id) FROM stdin;
1	1	1
2	1	2
3	1	3
4	1	4
5	1	5
6	1	8
7	2	1
8	2	2
9	2	3
10	2	4
11	2	7
12	2	8
13	3	1
14	3	2
15	3	3
16	3	4
17	3	7
18	3	8
19	4	1
20	4	2
21	4	3
22	4	4
23	4	5
24	4	7
25	4	8
26	5	1
27	5	2
28	5	3
29	5	4
30	5	8
31	7	1
32	7	2
33	7	3
34	7	4
35	7	7
36	7	8
37	8	1
38	8	2
39	8	3
40	8	4
41	8	5
42	8	7
43	8	8
44	9	3
45	9	4
46	9	5
47	9	7
48	9	8
\.


--
-- Data for Name: konfiguration_konfiguration; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.konfiguration_konfiguration (pkid, id, created_at, updated_at, ort, plz) FROM stdin;
1	a856640d-db6c-4c2f-a2e6-70f41581055f	2024-02-26 21:59:04.644+00	2024-12-17 21:11:57.684956+00	Demogemeinde	0000
\.


--
-- Data for Name: kontakte_kontakt; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.kontakte_kontakt (pkid, id, created_at, updated_at, kuerzel, name, funktion, telefon, telefon2, telefon3, email, kategorie) FROM stdin;
1	cc8bc0aa-3f52-44a8-aca0-28ae5aa2ea03	2024-10-03 20:43:30.323918+00	2024-12-05 22:15:59.80037+00	C001	Michael Reichenauer	Administrator				office@michael-web.at	Test
2	389bab5a-91c8-4a1f-9586-2578a96dab3c	2024-10-04 09:43:21.875198+00	2024-12-05 22:32:13.284592+00	C002	Max Mustermann	Demouser					
\.


--
-- Data for Name: massnahmen_masfahrzeuge; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.massnahmen_masfahrzeuge (id, fah_id_id, mas_id_id) FROM stdin;
8	6	4
9	7	4
10	8	4
11	6	7
12	7	7
13	6	8
14	6	13
\.


--
-- Data for Name: massnahmen_maskontakte; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.massnahmen_maskontakte (id, kon_id_id, mas_id_id) FROM stdin;
\.


--
-- Data for Name: rollen_rollekontakterreichbarkeit; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.rollen_rollekontakterreichbarkeit (id, kon_id_id, rol_id_id) FROM stdin;
\.


--
-- Data for Name: rollen_rollekontaktverstaendigung; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.rollen_rollekontaktverstaendigung (id, kon_id_id, rol_id_id) FROM stdin;
\.


--
-- Data for Name: users_user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users_user (password, last_login, is_superuser, pkid, id, first_name, last_name, username, email, is_staff, is_verwaltung, is_active, date_joined) FROM stdin;
argon2$argon2id$v=19$m=102400,t=2,p=8$R3UyMDVtSDRUUlZVb1o0VmRSUDdGSw$NBgy25aZrUV9Ru4iG27MSK+R/hk60TDCdrcyBZ/tTFw	2025-01-22 07:11:48.219832+00	f	3	bb79f2eb-b8a6-4c81-aeac-e06af95d65ae	Christoph	Polzer	christoph		t	t	t	2025-01-22 07:07:54.198796+00
argon2$argon2id$v=19$m=102400,t=2,p=8$anhWT0t5NUx6b1M0c3VXbHJ2MVpRMw$F/qBPuvWmWmWi7EorpEGL6oR3BLanh4jvwRizAL4dU0	2025-01-22 07:17:23.368917+00	f	5	f2d09075-bdd4-4437-9872-2f82742e35ef	Maria	Kirschenmann	maria		t	t	t	2025-01-22 07:10:18.580179+00
argon2$argon2id$v=19$m=102400,t=2,p=8$UlJMMGFkOU0zUXF3MmRneUR1eHFtbg$NYyLBtTNiP4nBZr1ScZSCjF2RvhuE36gHyk7444z8CE	2025-01-22 12:57:20.23645+00	f	4	0a6324d6-7f8e-44b1-9a18-017c1860175c	Marco	Felbermayer	marco		t	t	t	2025-01-22 07:08:53.99141+00
argon2$argon2id$v=19$m=102400,t=2,p=8$eklWN2E5TzRoT0s3cjlsOEFRenBmbA$g+mQ6fha5Llvm/A/4HGKFwWDt/yRA0cPInDwA+A6Kus	2025-01-23 23:59:46.351517+00	t	1	1e5ef3f7-7677-48a9-95fd-d3af059e1a1f	Michael	Reichenauer	admin	\N	t	t	t	2024-02-26 21:55:10.33+00
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

SELECT pg_catalog.setval('public.fahrzeuge_fahrzeug_pkid_seq', 9, true);


--
-- Name: gefahren_gefahr_pkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.gefahren_gefahr_pkid_seq', 9, true);


--
-- Name: gefahren_gefdokumente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.gefahren_gefdokumente_id_seq', 9, true);


--
-- Name: gefahren_gefmassnahmen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.gefahren_gefmassnahmen_id_seq', 12, true);


--
-- Name: gefahren_gefrollen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.gefahren_gefrollen_id_seq', 20, true);


--
-- Name: kat_material_katmaterial_pkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.kat_material_katmaterial_pkid_seq', 4, true);


--
-- Name: katastrophen_katastrophe_pkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.katastrophen_katastrophe_pkid_seq', 13, true);


--
-- Name: katastrophen_katgefahren_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.katastrophen_katgefahren_id_seq', 40, true);


--
-- Name: katastrophen_katmassnahmen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.katastrophen_katmassnahmen_id_seq', 45, true);


--
-- Name: katastrophen_katrollen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.katastrophen_katrollen_id_seq', 48, true);


--
-- Name: konfiguration_konfiguration_pkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.konfiguration_konfiguration_pkid_seq', 1, true);


--
-- Name: kontakte_kontakt_pkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.kontakte_kontakt_pkid_seq', 2, true);


--
-- Name: massnahmen_masfahrzeuge_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.massnahmen_masfahrzeuge_id_seq', 14, true);


--
-- Name: massnahmen_maskontakte_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.massnahmen_maskontakte_id_seq', 1, false);


--
-- Name: massnahmen_massnahme_pkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.massnahmen_massnahme_pkid_seq', 13, true);


--
-- Name: rollen_rolle_pkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.rollen_rolle_pkid_seq', 10, true);


--
-- Name: rollen_rollekontakterreichbarkeit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.rollen_rollekontakterreichbarkeit_id_seq', 1, false);


--
-- Name: rollen_rollekontaktverstaendigung_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.rollen_rollekontaktverstaendigung_id_seq', 1, false);


--
-- Name: users_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_groups_id_seq', 1, false);


--
-- Name: users_user_pkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_pkid_seq', 5, true);


--
-- Name: users_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_user_permissions_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

