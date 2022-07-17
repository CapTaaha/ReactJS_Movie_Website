import IDataList from "../models/IDataList";
import { getDataFromServer, addToFavourites, removeFromFavourites } from "../service/ApiCalls";
import { useState, useEffect, ChangeEvent } from "react";
import { ToastContainer, Toast, Row, Col, Container, Form } from "react-bootstrap";
import MovieItem from "./MovieItem";
import ToastItem from "./ToastItem";

type Props = {
    match: any
}

type ToastObject = {
    toastString: string,
    toastBgType: string
}

const MovieList = (props: Props) => {

    const [filteredItems, setFilteredItems] = useState<IDataList[]>([]);
    const [toast, setToast] = useState<ToastObject[]>([]);
    const [search, setSearch] = useState<string>("");
    const [receivedData, setReceivedData] = useState<IDataList[]>([]);

    let section = props.match.params.section;

    useEffect(
        () => {
            const getData = async () => {
                const data = await getDataFromServer(section);
                setReceivedData(data);
                filterItems(search, data);

            }
            getData();
        },
        [section]
    );

    const filterItems = (searchString: string, data: IDataList[]) => {
        if (searchString !== "") {
            const filteredMovies = data.filter(
                movie => movie.title.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
            )
            setFilteredItems(filteredMovies);
        }
        else {
            setFilteredItems(data);
        }
    }

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const searchString = event.target.value;
        setSearch(searchString);
        filterItems(searchString, receivedData);
    }

    const handleFavourites = async (movie: IDataList) => {
        try {
            if (section === "favourite") {
                const data = await removeFromFavourites(movie.id);
                const itemsAfterDelete = receivedData.filter(data => data.id !== movie.id);
                setToast([...toast, { toastString: `${movie.title} removed from Favourites`, toastBgType: "success" }]);
                setReceivedData(itemsAfterDelete);
                filterItems(search, itemsAfterDelete);
            }
            else {
                const favouriteMovies = await getDataFromServer("favourite");
                const movieAlreadyPresent = favouriteMovies.filter(data => data.title === movie.title);
                if (movieAlreadyPresent.length === 0) {
                    const { id, ...movieWithoutId } = movie;
                    const data = await addToFavourites(movieWithoutId);
                    setToast([...toast, { toastString: `${movie.title} added to Favourites`, toastBgType: "info" }]);
                }
                else {
                    setToast([...toast, { toastString: `${movie.title} already present in Favourites`, toastBgType: "warning" }]);
                }
            }
        }
        catch (e: any) {
            console.log(e.message);
        }
    }

    const favouriteText = section === "favourite" ? "Remove from favourites" : "Add to favourites";

    return (
        <>
            <Container>
                <Form style={{ position: "sticky", top: "0px", zIndex: 1 }}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Search for a movie" value={search} onChange={handleSearch} />
                    </Form.Group>
                </Form>
                <ToastContainer className="p-3" style={{ zIndex: 2, position: "fixed", right: "20px", top: "20px" }}>
                    {
                        toast.map((toast, idx) => <ToastItem key={idx} toastString={toast.toastString} toastBgType={toast.toastBgType} />)
                    }
                </ToastContainer>
                {
                    filteredItems.length > 0 ?
                        (
                            <Row lg={6} md={4} sm={3} xs={2}>
                                {
                                    filteredItems.map((movie, idx) => {
                                        return (
                                            <Col key={idx} className="d-flex align-items-stretch my-3">
                                                <MovieItem movie={movie} handleFavourites={handleFavourites} favouriteText={favouriteText} />
                                            </Col>
                                        )
                                    }
                                    )

                                }
                            </Row>
                        ) : (
                            <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                                {
                                    section === "favourite" ?
                                        "Favourites is empty. Please add movies." : "No data found."
                                }
                            </div>
                        )
                }
            </Container>
        </>
    )

}

export default MovieList;