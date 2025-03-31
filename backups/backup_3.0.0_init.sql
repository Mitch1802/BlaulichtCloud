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
\.


--
-- Data for Name: fahrzeuge_fahrzeug; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.fahrzeuge_fahrzeug (pkid, id, created_at, updated_at, kuerzel, name, foto, fahrzeug, anhaenger, type, lenkerberechtigung, stationierung, personenkapazitaet, treibstoff, nutzlast, ladebordwand, ladekran, wassertank, "wassertankAbnehmbar", "geschlossenerAufbau", sonderausstattung, anhaengervorrichtung, kategorie, reihenfolge) FROM stdin;
\.


--
-- Data for Name: gefahren_gefahr; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.gefahren_gefahr (pkid, id, created_at, updated_at, kuerzel, name, beschreibung, ausloeser, "feld1Name", "feld1Value", "feld2Name", "feld2Value", "feld3Name", "feld3Value", "feld4Name", "feld4Value", "feld5Name", "feld5Value", folgen, gefahren, reihenfolge) FROM stdin;
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
\.


--
-- Data for Name: gefahren_gefmassnahmen; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.gefahren_gefmassnahmen (id, gef_id_id, mas_id_id) FROM stdin;
\.


--
-- Data for Name: rollen_rolle; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.rollen_rolle (pkid, id, created_at, updated_at, kuerzel, name, beschreibung, notruf, aufgaben) FROM stdin;
\.


--
-- Data for Name: gefahren_gefrollen; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.gefahren_gefrollen (id, gef_id_id, rol_id_id) FROM stdin;
\.


--
-- Data for Name: kat_material_katmaterial; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.kat_material_katmaterial (pkid, id, created_at, updated_at, artikel, bemerkung, menge, stationierungsort) FROM stdin;
\.


--
-- Data for Name: katastrophen_katastrophe; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.katastrophen_katastrophe (pkid, id, created_at, updated_at, kuerzel, name, beschreibung, reihenfolge) FROM stdin;
\.


--
-- Data for Name: katastrophen_katgefahren; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.katastrophen_katgefahren (id, gef_id_id, kat_id_id) FROM stdin;
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
\.


--
-- Data for Name: massnahmen_masfahrzeuge; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.massnahmen_masfahrzeuge (id, fah_id_id, mas_id_id) FROM stdin;
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
argon2$argon2id$v=19$m=102400,t=2,p=8$ZGZMVjRBQTNmMVVONTZ4QlhzcXFiSQ$RN785VE/QFtd0f3U/FzFu7mO+XDLLYO/AeaG9IP3cBw	2025-02-16 17:47:09.196571+00	t	1	1e5ef3f7-7677-48a9-95fd-d3af059e1a1f	Michael	Reichenauer	admin	\N	t	t	t	2024-02-26 21:55:10.33+00
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

SELECT pg_catalog.setval('public.users_user_pkid_seq', 2, true);


--
-- Name: users_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_user_permissions_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

