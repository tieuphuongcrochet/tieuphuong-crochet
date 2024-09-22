import React from 'react'
import { Adsense } from '@ctrl/react-adsense';
import './style.scss';

function AdsenseExample() {
    //console.log("Ads Shown")
    return (
        <Adsense
            className='custom-AdSlot'
            client="ca-pub-1234"
            slot="2222222"
            adTest='on' //Dev Only
        />
    )

}

export default AdsenseExample;