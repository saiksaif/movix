"use client"

import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { usePathname } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDataFromApi } from "../../../utils/api";
import ContentWrapper from "@/components/contentWrapper/ContentWrapper";
import MovieCard from "@/components/movieCard/MovieCard";
import Spinner from "@/components/spinner/Spinner";
import noResults from "@/assets/no-results.png";

const SearchResult = ({ params }: { params: { keyword: string } }) => {
    const [data, setData]: any = useState({});
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    // const { query } = useParams();

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/search/multi?query=${params.keyword}&page=${pageNum}`).then(
            (res) => {
                setData(res);
                setPageNum((prev) => prev + 1);
                setLoading(false);
            }
        );
    };

    const fetchNextPageData = () => {
        fetchDataFromApi(`/search/multi?query=${params.keyword}&page=${pageNum}`).then(
            (res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...data?.results, ...res.results],
                    });
                } else {
                    setData(res);
                }
                setPageNum((prev) => prev + 1);
            }
        );
    };

    useEffect(() => {
        setPageNum(1);
        fetchInitialData();
    }, [params.keyword]);

    return (
        <div className="searchResultsPage">
            {loading && <Spinner initial={true} />}
            {!loading && (
                <ContentWrapper>
                    {data?.results?.length > 0 ? (
                        <>
                            <div className="pageTitle">
                                {`Search ${
                                    data?.total_results > 1
                                        ? "results"
                                        : "result"
                                } of '${params.keyword}'`}
                            </div>
                            <InfiniteScroll
                                className="content"
                                // initial={{}} // add this
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner initial={true} />}
                                >
                                {data?.results.map((item: any, index: any) => {
                                    if (item.media_type === "person") return;
                                    return (
                                    <MovieCard
                                        key={index}
                                        data={item}
                                        fromSearch={true}
                                        mediaType={item.media_type} // add this
                                    />
                                    );
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <span className="resultNotFound">
                            Sorry, Results not found!
                        </span>
                    )}
                </ContentWrapper>
            )}
        </div>
    );
};

export default SearchResult;
