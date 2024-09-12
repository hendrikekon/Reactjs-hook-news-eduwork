import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import noImage from './img/noimage.png'

const NewsHook = () => {

    const [articles, setArticles] = useState([]);
    const [cari, setCari] = useState('');

    // useEffect(() => {
    //   fetchNews('latest');
    // }, []);

    // useEffect(() => {
    //     fetchNews(cari || 'latest')
    // }, [cari]);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            fetchNews(cari || 'latest')
        }, 1000)
        
        return () => {
            clearTimeout(debounceTimeout)
        }
    }, [cari]);

    //note belajar: perbedaan hook. hook tidak menggunakan this, this.state dan this.setState . state dan setstate diganti.
    //note belajar: useState digunakan untuk menentukan tipe data. seperti string, array atau object.
    //note belajar: useEffect digunakan untuk menjalankan sebuah fungsi ketika state berubah. seperti componentDidMount, componentDidUpdate, dan componentWillUnmount.
    //note belajar: jika useEffect dipakai di dalam sebuah component, maka useEffect akan dipanggil setiap kali state berubah.
    //note belajar: useEffect dipakai jika ingin melakukan pekerjaan yang memerlukan pengambilan data asinkron, seperti melakukan fetch data.


    const fetchNews = (cari = 'latest') => {
        const apikey = '6ad41eab56c647d1b769e86a82a0239c';
        const url = `https://newsapi.org/v2/everything?qInTitle=${cari}&from=2024-08-14&sortBy=publishedAt&language=en&apiKey=${apikey}`;

        fetch(url)
            .then(response => response.json())
            .then((data) => {
            if (data.articles) {
                setArticles( data.articles );
            } else {
                console.log('Error fetching data');
            }
            })
            .catch(err => console.log('Error fetching data', err));
    };

    const handleSearch = (event) => {
        setCari(event.target.value );
    };

    const handleButton = () => {
        const searchQuery = cari.length === 0 ? 'latest' : cari;
        fetchNews(searchQuery);
    };

    return (
        <div className="container">
        <h1>Portal Berita</h1>

        <div className="input-group mb-3">
            <input
            type="text"
            id="search"
            className="form-control"
            placeholder="Cari Berita ...."
            value={cari}
            onChange={handleSearch}
            />
            <button onClick={handleButton} className="btn btn-primary">Get News</button>
        </div>

        <div id="newsListContainer" className="row">
            {articles.map((article, index) => (
            <div key={index} className="news-item col-md-4 mb-4">
                <div className="card">
                <img
                    className="card-img-top"
                    src={article.urlToImage || noImage} 
                    alt={article.title}
                />
                <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-subtitle mb-2 text-muted">{article.author}</p>
                    <p className="card-text">{article.publishedAt}</p>
                    <p className="card-text">{article.description || 'Tidak Ada Deskripsi'}</p>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Baca Lengkap
                    </a>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
}

export default NewsHook;
