import React, { FC } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";

import TuneIcon from '@mui/icons-material/Tune';

import Image from 'next/image'
import Head from "next/head";
import styles from '../styles/Home.module.css'


interface Props {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
    children?: React.ReactNode
    robots?: string;

}

export const MainLayout:FC<Props> = ({ children, title, pageDescription, imageFullUrl, robots }) => {
  return (
    <div >
        <Head>
            <title>{ title }</title>
            <meta name="description" content={ pageDescription }></meta>

            <meta name="og:title" content={ title }></meta>
            <meta name="og:description" content={ pageDescription }></meta>
            {
                imageFullUrl && (
                    <meta name="og:image" content={ imageFullUrl }></meta>
                )
            }

            <meta name="author" content="Ricardo Ochoa"></meta>
            <meta name="copyright" content="Ricardo @ochoagram"></meta>
            <meta name="robots" content={ robots }></meta>



            <meta name="twitter:account_id" content="18ce55hprg3"/>
            <meta property="twitter:domain" content={ title }></meta>
            <meta name="twitter:card" content="summary"></meta>
            <meta name="twitter:site" content="@ochoagram"></meta>
            <meta name="twitter:creator" content="@ochoagram"></meta>
            <meta property="twitter:image:src" content={ imageFullUrl }></meta>
            
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />

            
        </Head>

            <main className='main' style={{
                margin: '0 auto',
                maxWidth: '1200px',
                
            }}>
                { children }
            </main>

            <Box className="video-container">
                <video autoPlay muted loop className="video" >
                    <source src="https://res.cloudinary.com/dnxxkvpiz/video/upload/v1667886984/ochoagram/bg_viewfinder_nutqg2.mp4" type="video/mp4"/>
                </video>
            </Box>





    </div>
  )
}
