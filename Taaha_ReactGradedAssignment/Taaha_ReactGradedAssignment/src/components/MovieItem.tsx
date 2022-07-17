import IDataList from "../models/IDataList";
import { Card, Button, Modal, Image, Table } from "react-bootstrap";
import { addToFavourites } from "../service/ApiCalls";
import { useState } from "react";

type Props = {
    movie: IDataList,
    handleFavourites: (movie: IDataList) => {},
    favouriteText: string
}

const MovieItem = ({ movie, handleFavourites, favouriteText }: Props) => {

    const [show, setShow] = useState(false);

    const {title,year,genres,poster,releaseDate,storyline,actors} = movie
    const movieDetails = [
        {
            header : "Title",
            content : title
        },
        {
            header : "Year",
            content : year
        },
        {
            header : "Genres",
            content : genres.toString()
        },
        {
            header : "Release Date",
            content : releaseDate
        },
        {
            header : "Description",
            content : storyline
        },
        {
            header : "Cast",
            content : actors.toString()
        }
    ];

    return (
        <>
            <Card style={{ width: '18rem', height : '25rem' }}>
                <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/img/${poster}`} className="h-50"/>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Button className="mb-2" variant="primary" onClick={() => { handleFavourites(movie) }}>{favouriteText}</Button>
                    <Button variant="secondary" onClick={() => { setShow(true) }}>Click to see details</Button>
                </Card.Body>
            </Card>
            <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center align-items-center">
                        <Image src={`${process.env.PUBLIC_URL}/img/${poster}`} className="mx-5"/>
                        <Table striped bordered hover className="mx-5">
                            <tbody>
                                {
                                    movieDetails.map(
                                        movieData => {
                                            return (
                                                <tr key={movieData.header}>
                                                    <td>{movieData.header}</td>
                                                    <td>{movieData.content}</td>
                                                </tr>
                                            )
                                        }
                                    )
                                }
                            </tbody>
                        </Table>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default MovieItem;