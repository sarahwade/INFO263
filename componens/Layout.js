// src/components/Layout.js
import React from 'react';

import Image from "next/image";

import styles from "../page.module.css";
import {useState, useEffect} from "react";
import Link from 'next/link'


const Layout = ({ children }) => {
    return (
        <div className={styles.page}>
            <Header />
            {/*<Nav />*/}

            <main className={styles.main}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

const Header = () => {
    return (
        <header className={styles.pageHeader}>
            <img
                className="logo"
                src="https://cdn.vectorstock.com/i/500p/35/82/car-rental-vector-13423582.jpg"
                alt="Car Rental Logo"
                width={212}
                height={100}
                />
            {/*<h1>CAR HIRE</h1>*/}

        </header>
    );
};


const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p> The footer - edited in components/Layout </p>
        </footer>
    );
};

export default Layout;
