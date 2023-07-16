/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import Head from 'next/head';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Webcam from 'react-webcam';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

function PhotoUploader() {
  const webcamRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
    setIsPreviewMode(true);
  };

  const deletePhoto = () => {
    setPhoto(null);
    setIsPreviewMode(false);
  };

  return (
    <div>
      {!isPreviewMode ? (
        <Webcam audio={false} ref={webcamRef} className={styles.webcam} />
      ) : (
        <div>
          <img src={photo} className={styles.capturedPhoto} />
        </div>
      )}
      <div>
        {!isPreviewMode && (
          <Button className={styles.buttonUploadPhoto} onClick={capturePhoto}>
            Capture Photo
          </Button>
        )}
        {isPreviewMode && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Button className={styles.buttonUploadPhoto} onClick={deletePhoto}>
              Delete Photo
            </Button>
            <Button
              type="submit"
              className={styles.buttonUploadPhoto}
              href="/otpVote"
            >
              Upload
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PilihGeh-Verification</title>
        <link rel="icon" href="/Logo 3.png" />
      </Head>

      <Container fluid>
        <Row>
          <Col className={styles.formOtp}>
            <div className={styles.logoLogin}>
              <Image src="/Logo.png" alt="logo-login" layout="fill" />
            </div>
            <div className={styles.TeksLogin}>Photo Verification</div>
            <div className={styles.teksOtp}>
              Please take a photo using your ID card <br />
              to verify that you are voting.
            </div>
            <PhotoUploader />
          </Col>
          <Col className="d-none d-md-block p-0">
            <div className={styles.bgLogin}>
              <Image src="/Bg login.png" alt="banner-login" layout="fill" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
