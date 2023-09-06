/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import Head from 'next/head';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import Webcam from 'react-webcam';
import Image from 'next/image';
import { useRouter } from 'next/router';
import votingServices from 'services/voting-services';
import Swal from 'sweetalert2';
import styles from '../../../../styles/Home.module.css';

function PhotoUploader() {
  const webcamRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { noCandidate } = router.query;
  const no_kandidat = noCandidate;

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
    setIsPreviewMode(true);
  };

  const deletePhoto = () => {
    setPhoto(null);
    setIsPreviewMode(false);
  };

  const handleVote = async () => {
    setIsLoading(true);
    try {
      if (photo) {
        const imageBlob = await fetch(photo).then((r) => r.blob());
        const formData = new FormData();
        formData.append('id', id);
        formData.append('no_kandidat', no_kandidat);
        formData.append('image', imageBlob, 'image.jpg');

        const response = await votingServices.addVote(
          id,
          no_kandidat,
          formData
        );
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message,
        });
        router.push(`/detailPemilihan/${id}`);
      } else {
        // Handle the case when no photo is captured
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops..',
        text: error.response?.data?.message,
      });
    } finally {
      setIsLoading(false);
    }
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
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button className={styles.baseButton} onClick={capturePhoto}>
              Capture Photo
            </Button>
          </div>
        )}
        {isPreviewMode && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Button className={styles.baseButton} onClick={deletePhoto}>
              Delete Photo
            </Button>
            <Button
              type="submit"
              className={styles.baseButton}
              onClick={handleVote}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner animation="border" role="status" size="sm" />
              ) : (
                <div>Vote</div>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className={styles.container}>
      <Head>
        <title>PilihGeh-Verification</title>
        <link rel="icon" href="/Logo 3.png" />
      </Head>

      <Container fluid>
        <Row>
          <Col style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={styles.formLoginDaftarOTP}>
              <a href={`/detailPemilihan/${id}`}>
                <div className={styles.logoLoginRegisterOtp}>
                  <Image src="/Logo.png" alt="logo-login" layout="fill" />
                </div>
              </a>
              <div className={styles.TitleCenter}>Photo Verification</div>
              <div className={styles.containerPhotoUploader}>
                <PhotoUploader />
              </div>
              <div className={styles.containerAlready}>
                <div className={styles.teksAlready}>
                  Please take a photo using your ID card to verify that you are
                  voting.
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
