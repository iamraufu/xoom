import React, { useEffect } from 'react';
import './Zoom.css';
import { ZoomMtg } from '@zoomus/websdk';

// const crypto = require('crypto');
// var createHmac = require('create-hmac');
// window.Buffer = window.Buffer || require('buffer').Buffer;

function generateSignature(apiKey, apiSecret, meetingNumber, role) {
    return new Promise((res, rej) => {
        const timestamp = new Date().getTime() - 30000;
        const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64');

        const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64');

        const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')

        res(signature);
        console.log(rej);
    });
}



// let signatureEndpoint = 'http://localhost:4000'
// let JWT_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IlhoYkY3dFg4U1RxcVF2S1lUc0F4SWciLCJleHAiOjE2NTAxMzg2MDksImlhdCI6MTY1MDEzMzIxMH0.eY98--NYpQh-L0Zo7nHQGCUCZopzs2OI1d0Sj2sEM9M';

let apiKey = 'XhbF7tX8STqqQvKYTsAxIg';
let apiSecret = 'y5FK62sYiPceiK1NLLtn7AUUavr4KHQfDv8s';
let meetingNumber = 85771397293;

// let role = 0;

let leaveUrl = 'http://localhost:3000'; // our redirect url
let userName = 'WebSDK';
let userEmail = 'eftykharrahman@gmail.com';
let passWord = '360591';

let signature = '';
generateSignature(apiKey, apiSecret, meetingNumber, 0)
    .then((res) => {
        signature = res;
    }); // need to generate it based on meeting id

console.log(generateSignature(apiKey, apiSecret, meetingNumber, 0))

const Xoom = () => {

    useEffect(() => {
        showZoomDiv();
        ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.0/lib', '/av');
        // ZoomMtg.setZoomJSLib("node_modules/@zoomus/websdk/dist/lib/", "/av");
        ZoomMtg.preLoadWasm();
        // ZoomMtg.prepareJssdk();
        ZoomMtg.prepareWebSDK();
        initiateMeeting();

    }, [])

    const showZoomDiv = () => {
        document.getElementById('zmmtg-root').style.display = 'block';
    }

    const initiateMeeting = () => {
        ZoomMtg.init({
            leaveUrl: leaveUrl,
            isSupportAV: true,
            success: (success) => {
                console.log(success);

                ZoomMtg.join({
                    signature: signature,
                    meetingNumber: meetingNumber,
                    userName: userName,
                    apiKey: apiKey,
                    userEmail: userEmail,
                    passWord: passWord,
                    success: (success) => {
                        console.log(success);
                    },
                    error: (error) => {
                        console.log(error);
                    },
                });
            },
            error: (error) => {
                console.log(error);
            },
        });
    };

    return (
        <div>
            <h1>Xoom</h1>
        </div>
    );
};

export default Xoom;