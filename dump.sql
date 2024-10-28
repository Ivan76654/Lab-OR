--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: city; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.city (
    cityid integer NOT NULL,
    cityname character varying(50) NOT NULL,
    country character varying(70) NOT NULL,
    latitude numeric(7,4) NOT NULL,
    longitude numeric(7,4) NOT NULL,
    area numeric(6,2),
    elevation integer,
    population integer,
    timezone character varying(10) NOT NULL,
    region character varying(70) NOT NULL,
    CONSTRAINT ckarea CHECK ((area > (0)::numeric)),
    CONSTRAINT ckpopulation CHECK ((population > 0))
);


ALTER TABLE public.city OWNER TO postgres;

--
-- Name: city_cityid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.city_cityid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.city_cityid_seq OWNER TO postgres;

--
-- Name: city_cityid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.city_cityid_seq OWNED BY public.city.cityid;


--
-- Name: measurement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.measurement (
    measurementid integer NOT NULL,
    cityid integer,
    "timestamp" timestamp without time zone NOT NULL,
    temperature numeric(5,2),
    humidity numeric(5,2),
    pressure numeric(7,2)
);


ALTER TABLE public.measurement OWNER TO postgres;

--
-- Name: measurement_measurementid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.measurement_measurementid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.measurement_measurementid_seq OWNER TO postgres;

--
-- Name: measurement_measurementid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.measurement_measurementid_seq OWNED BY public.measurement.measurementid;


--
-- Name: city cityid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city ALTER COLUMN cityid SET DEFAULT nextval('public.city_cityid_seq'::regclass);


--
-- Name: measurement measurementid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.measurement ALTER COLUMN measurementid SET DEFAULT nextval('public.measurement_measurementid_seq'::regclass);


--
-- Data for Name: city; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.city (cityid, cityname, country, latitude, longitude, area, elevation, population, timezone, region) FROM stdin;
1	Berlin	Germany	52.5200	13.4050	891.30	34	3878000	CET	Berlin
2	Madrid	Spain	40.4168	-3.7038	604.31	650	3223334	CET	Madrid
3	Paris	France	48.8566	2.3522	105.40	78	2102650	CET	Île-de-France
4	Rome	Italy	41.9028	12.4964	1285.00	21	2860009	CET	Lazio
5	Amsterdam	Netherlands	52.3676	4.9041	219.32	-2	933680	CET	North Holland
6	Vienna	Austria	48.2082	16.3738	414.78	495	2014614	CET	Vienna
7	Stockholm	Sweden	59.3293	18.0686	188.00	28	984748	CET	Stockholm County
8	Copenhagen	Denmark	55.6761	12.5683	90.01	13	660842	CET	Capital Region
9	Zagreb	Croatia	45.8130	15.9775	641.20	158	767131	CET	City of Zagreb
10	London	United Kingdom	51.5074	-0.1278	1572.00	25	8866180	GMT	London
\.


--
-- Data for Name: measurement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.measurement (measurementid, cityid, "timestamp", temperature, humidity, pressure) FROM stdin;
1	1	2023-01-15 07:45:00	-1.30	82.50	1025.60
2	1	2023-05-20 14:30:00	20.10	45.30	1013.20
3	2	2023-02-22 16:00:00	14.50	50.40	1016.30
4	2	2023-06-15 12:30:00	29.20	40.20	1010.90
5	2	2023-08-30 20:45:00	26.80	48.70	1009.50
6	3	2023-03-10 08:00:00	5.20	78.40	1021.50
7	3	2023-07-20 17:30:00	25.60	55.60	1011.70
8	3	2023-10-22 06:45:00	12.30	68.10	1016.20
9	4	2023-01-28 11:15:00	10.70	55.90	1018.30
10	4	2023-07-04 14:45:00	30.10	42.00	1012.80
11	5	2023-04-18 13:00:00	10.30	65.20	1019.80
12	5	2023-08-14 07:45:00	21.50	60.90	1010.60
13	5	2023-10-01 19:30:00	16.40	72.30	1012.40
14	6	2023-09-25 16:30:00	15.70	58.40	1015.90
15	7	2023-01-12 11:30:00	-2.40	88.50	1026.70
16	7	2023-05-30 08:45:00	15.00	66.40	1014.00
17	7	2023-09-18 14:30:00	17.20	70.80	1016.90
18	8	2023-02-01 06:30:00	-5.70	90.20	1028.00
19	8	2023-06-25 15:15:00	18.20	60.10	1015.30
20	9	2023-04-10 07:00:00	8.50	65.00	1020.40
21	9	2023-08-19 16:45:00	28.30	50.70	1011.00
22	9	2023-12-01 20:15:00	4.00	78.90	1025.30
23	10	2023-03-15 14:00:00	10.80	75.30	1019.10
24	10	2023-07-09 18:15:00	22.40	57.90	1011.20
25	10	2023-11-20 09:30:00	9.10	80.50	1016.80
\.


--
-- Name: city_cityid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.city_cityid_seq', 10, true);


--
-- Name: measurement_measurementid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.measurement_measurementid_seq', 25, true);


--
-- Name: city pkcityid; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city
    ADD CONSTRAINT pkcityid PRIMARY KEY (cityid);


--
-- Name: measurement pkmeasurementid; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.measurement
    ADD CONSTRAINT pkmeasurementid PRIMARY KEY (measurementid);


--
-- Name: measurement fkcityid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.measurement
    ADD CONSTRAINT fkcityid FOREIGN KEY (cityid) REFERENCES public.city(cityid);


--
-- PostgreSQL database dump complete
--

