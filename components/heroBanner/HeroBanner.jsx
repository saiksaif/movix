"use client"
import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";
import { useRouter } from 'next/navigation';

import useFetch from "../../hooks/useFetch";

import Img from "@/components/lazyLoadImage/Img";
import ContentWrapper from "@/components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    // const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFetch("/movie/upcoming");
    const { push } = useRouter();

    useEffect(() => {
        const bg =
            url.backdrop +
            data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    }, [data]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            push(`/search/${query}`);
        }
    };

    return (
        <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}

            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Dear Client.</span>
                    <span className="subTitle">
                        {/* Millions of movies, TV shows and people to discover. */}
                        Due to technical reason my Fiverr account got disabled and now I can't reach you so kindly contact me so that we can proceed. Thanks I'm waiting for your response. <br /> <br />Email:  irfangulzar222@gmail.com <br />Phone/Whatsapp: +923331236782 <br />Telegram: @fiverrola
                        Explore now.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;
