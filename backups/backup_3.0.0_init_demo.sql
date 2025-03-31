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
5	b1c9dc9d-c1b9-49e2-a017-6c6662bf088f	2025-03-15 22:10:25.028342+00	2025-03-15 22:10:25.028382+00	D001	Wasserleitungsplan	/dokumente/default.pdf	0	
\.


--
-- Data for Name: fahrzeuge_fahrzeug; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.fahrzeuge_fahrzeug (pkid, id, created_at, updated_at, kuerzel, name, foto, fahrzeug, anhaenger, type, lenkerberechtigung, stationierung, personenkapazitaet, treibstoff, nutzlast, ladebordwand, ladekran, wassertank, "wassertankAbnehmbar", "geschlossenerAufbau", anhaengervorrichtung, kategorie, reihenfolge, sonderausstattung) FROM stdin;
10	6368cf7a-aa0f-4ca7-aabf-c5207ea6c17f	2025-03-15 22:10:08.704157+00	2025-03-15 22:12:18.364263+00	F001	Transportfahrzeug	/fahrzeuge/default.png	t	f		B	Wirtschatfshof	9	Diesel	0	f	f		f	f			0	
\.


--
-- Data for Name: gefahren_gefahr; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.gefahren_gefahr (pkid, id, created_at, updated_at, kuerzel, name, beschreibung, ausloeser, "feld1Name", "feld1Value", "feld2Name", "feld2Value", "feld3Name", "feld3Value", "feld4Name", "feld4Value", "feld5Name", "feld5Value", folgen, gefahren, reihenfolge) FROM stdin;
10	53046439-a338-4f5b-a2fc-9195026fc341	2025-03-15 22:15:01.348388+00	2025-03-15 22:15:01.348418+00	G001	Notunterkunft	Notunterkunft für Bevölkerung												Notversorgung mit Nahrung, Kleidung, Dokumenten		0
\.


--
-- Data for Name: gefahren_gefdokumente; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.gefahren_gefdokumente (id, dok_id_id, gef_id_id) FROM stdin;
10	5	10
\.


--
-- Data for Name: massnahmen_massnahme; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.massnahmen_massnahme (pkid, id, created_at, updated_at, kuerzel, name, beschreibung, kategorie, verantwortung, staerke, "feld1Name", "feld1Value", "feld2Name", "feld2Value", "feld3Name", "feld3Value", "feld4Name", "feld4Value", "feld5Name", "feld5Value", durchfuehrung, rueckbau, reihenfolge) FROM stdin;
14	dcfaf968-0a0d-4221-8e23-51ddb240d83d	2025-03-15 22:13:53.280835+00	2025-03-15 22:13:53.280867+00	M001	Logistiktransport	Mit den Fahrzeugen und Anhänger des Wirtschaftshofes...	G		0												Reinigung, Betankung	0
\.


--
-- Data for Name: gefahren_gefmassnahmen; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.gefahren_gefmassnahmen (id, gef_id_id, mas_id_id) FROM stdin;
13	10	14
\.


--
-- Data for Name: rollen_rolle; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.rollen_rolle (pkid, id, created_at, updated_at, kuerzel, name, beschreibung, notruf, aufgaben) FROM stdin;
11	256125a0-0ab8-46c4-befa-b9cf8b560859	2025-03-15 22:11:35.068285+00	2025-03-15 22:11:35.068316+00	R001	Örtlicher Einsatzleiter	Bürgermeister		
\.


--
-- Data for Name: gefahren_gefrollen; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.gefahren_gefrollen (id, gef_id_id, rol_id_id) FROM stdin;
21	10	11
\.


--
-- Data for Name: kat_material_katmaterial; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.kat_material_katmaterial (pkid, id, created_at, updated_at, artikel, bemerkung, menge, stationierungsort) FROM stdin;
5	b2c758c5-6e16-48b4-9822-a61f7c75f3c1	2025-03-15 22:08:03.786547+00	2025-03-15 22:08:03.786577+00	Sandsäcke		500	Wirtschaftshof
\.


--
-- Data for Name: katastrophen_katastrophe; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.katastrophen_katastrophe (pkid, id, created_at, updated_at, kuerzel, name, beschreibung, reihenfolge) FROM stdin;
14	d389b176-16fa-4cd8-b427-b67cafe69b2c	2025-03-15 22:15:31.808335+00	2025-03-15 22:15:31.808367+00	K001	Hochwasser	Durch hohe Niederschlagsmengen kann es zu Überflutungen kommen.	0
\.


--
-- Data for Name: katastrophen_katgefahren; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.katastrophen_katgefahren (id, gef_id_id, kat_id_id) FROM stdin;
41	10	14
\.


--
-- Data for Name: katastrophen_katmassnahmen; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.katastrophen_katmassnahmen (id, kat_id_id, mas_id_id) FROM stdin;
46	14	14
\.


--
-- Data for Name: katastrophen_katrollen; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.katastrophen_katrollen (id, kat_id_id, rol_id_id) FROM stdin;
49	14	11
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
3	961bb583-a11f-4eaa-b9e5-4d2a65333504	2025-03-15 22:10:55.336089+00	2025-03-15 22:10:55.33612+00	C001	Max Mustermann	Bürgermeister					
\.


--
-- Data for Name: massnahmen_masfahrzeuge; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.massnahmen_masfahrzeuge (id, fah_id_id, mas_id_id) FROM stdin;
15	10	14
\.


--
-- Data for Name: massnahmen_maskontakte; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.massnahmen_maskontakte (id, kon_id_id, mas_id_id) FROM stdin;
1	3	14
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
argon2$argon2id$v=19$m=102400,t=2,p=8$RXRTZWttdnlLNG5SWGdnbWFTbnNPQw$jH5VmdyeYOwFFjDQH7aaKLC8n0mVgQXxNAMglstDrk8	2025-03-07 01:31:00.248274+00	f	3	553d3df7-0b61-4fdf-af0c-ba498389fbb2	Demo	User	demo_user		f	f	t	2025-03-07 01:30:59.893777+00
argon2$argon2id$v=19$m=102400,t=2,p=8$aFhqWVRuTENnMnBIT2hTMnVoSjRCSA$7+/Kd8WcsDcqI+oM0iDiV8vxa3FeT5+QUi8USKIFbjc	2025-03-07 01:31:24.895021+00	f	4	42221f9a-362d-484e-a864-cc7c8bdf455b	Demo	Verwaltung	demo_verwaltung		f	t	t	2025-03-07 01:31:24.557758+00
argon2$argon2id$v=19$m=102400,t=2,p=8$VE4xbTVsUTltY0VlY2RrNVhuT0s0aw$vn+/UX0MbaItJ6eXVwckH2hIvK+XCx3KRlc9risNtIo	2025-03-15 21:53:12.190307+00	t	1	1e5ef3f7-7677-48a9-95fd-d3af059e1a1f	Michael	Reichenauer	admin	\N	t	t	t	2024-02-26 21:55:10.33+00
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

SELECT pg_catalog.setval('public.dokumente_dokument_pkid_seq', 5, true);


--
-- Name: fahrzeuge_fahrzeug_pkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.fahrzeuge_fahrzeug_pkid_seq', 10, true);


--
-- Name: gefahren_gefahr_pkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.gefahren_gefahr_pkid_seq', 10, true);


--
-- Name: gefahren_gefdokumente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.gefahren_gefdokumente_id_seq', 10, true);


--
-- Name: gefahren_gefmassnahmen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.gefahren_gefmassnahmen_id_seq', 13, true);


--
-- Name: gefahren_gefrollen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.gefahren_gefrollen_id_seq', 21, true);


--
-- Name: kat_material_katmaterial_pkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.kat_material_katmaterial_pkid_seq', 5, true);


--
-- Name: katastrophen_katastrophe_pkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.katastrophen_katastrophe_pkid_seq', 14, true);


--
-- Name: katastrophen_katgefahren_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.katastrophen_katgefahren_id_seq', 41, true);


--
-- Name: katastrophen_katmassnahmen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.katastrophen_katmassnahmen_id_seq', 46, true);


--
-- Name: katastrophen_katrollen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.katastrophen_katrollen_id_seq', 49, true);


--
-- Name: konfiguration_konfiguration_pkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.konfiguration_konfiguration_pkid_seq', 1, true);


--
-- Name: kontakte_kontakt_pkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.kontakte_kontakt_pkid_seq', 3, true);


--
-- Name: massnahmen_masfahrzeuge_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.massnahmen_masfahrzeuge_id_seq', 15, true);


--
-- Name: massnahmen_maskontakte_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.massnahmen_maskontakte_id_seq', 1, true);


--
-- Name: massnahmen_massnahme_pkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.massnahmen_massnahme_pkid_seq', 14, true);


--
-- Name: rollen_rolle_pkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.rollen_rolle_pkid_seq', 11, true);


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

SELECT pg_catalog.setval('public.users_user_pkid_seq', 4, true);


--
-- Name: users_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_user_permissions_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

