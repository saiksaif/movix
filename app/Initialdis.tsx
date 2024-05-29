"use client"
import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { fetchDataFromApi } from 'utils/api';
import { getApiConfiguration, getGenres } from 'store/homeSlice';

function InitialDisptach() {
  const dispatch = useDispatch();
  const { url } = useSelector((state: any) => state.home);
  // console.log(url);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      //   console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises: any = [];
    let endPoints = ["tv", "movie"];
    let allGenres: any = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    // console.log(data);
    data.map(({ genres }) => {
      return genres.map((item: any) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  };

  return (
    <></>
  )
}

export default InitialDisptach