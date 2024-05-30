'use client'
import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

import useFetch from "hooks/useFetch";
import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";

const Footer = () => {
    const { data: genresData } = useFetch(`/genre/movie/list`);
    const { data: genresData2 } = useFetch(`/genre/tv/list`);

    return (
        <footer className="footer">
            <ContentWrapper>
                <ul className="menuItems flex items-start">
                    <li className="menuItem">
                        <h3>Movies</h3>
                        <br />
                        <ul>
                            {genresData && genresData?.genres.map((genre, index) => { return (
                                <a key={index} href={`/explore/movie/${genre.id}`}>
                                    <li>{genre.name}</li>
                                </a>
                            ) })}
                        </ul>
                    </li>
                    <li className="menuItem">
                        <h3>TV Shows</h3>
                        <br />
                        <ul>
                            {genresData2 && genresData2?.genres.map((genre, index) => { return (
                                <a key={index} href={`/explore/tv/${genre.id}`}>
                                    <li>{genre.name}</li>
                                </a>
                            ) })}
                        </ul>
                    </li>
                    <li className="menuItem">
                        <h3>Useful Links</h3>
                        <br />
                        <ul>
                            <li className="menuItem">Terms Of Use</li>
                            <li className="menuItem">Privacy-Policy</li>
                            <li className="menuItem">About</li>
                            <li className="menuItem">Blog</li>
                            <li className="menuItem">FAQ</li>
                        </ul>
                    </li>
                    {/* <li className="menuItem">Terms Of Use</li>
                    <li className="menuItem">Privacy-Policy</li>
                    <li className="menuItem">About</li>
                    <li className="menuItem">Blog</li>
                    <li className="menuItem">FAQ</li> */}
                </ul>
                <div className="infoText">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                </div>
                <div className="socialIcons">
                    <span className="icon">
                        <FaFacebookF />
                    </span>
                    <span className="icon">
                        <FaInstagram />
                    </span>
                    <span className="icon">
                        <FaTwitter />
                    </span>
                    <span className="icon">
                        <FaLinkedin />
                    </span>
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;
