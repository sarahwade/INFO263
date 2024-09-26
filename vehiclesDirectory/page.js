"use client"

import Image from "next/image";
import styles from "../page.module.css";
import {useState, useEffect} from "react";
import Link from 'next/link'
import Layout from "../components/Layout"; // Import the layout component

import ReactPaginate from "react-paginate";

//export default function Page() {
export default function VehiclesDirectory(){
    const [vehicles, setVehicles] = useState([]);

    // two lines
    const[itemOffset, setItemOffset] = useState(0);
    const itemsPerPage =24;


    useEffect(() => {
        document.title = "Vehicles";
        async function fetchVehicles() {
            let res = await fetch('http://localhost/car_rental/car_php/car_rental.php?query=vehicle')
            let data = await res.json()
            setVehicles(data)
        }
        fetchVehicles()
    }, [])

    // three lines
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = vehicles.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(vehicles.length / itemsPerPage);

    //method
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % vehicles.length;
        // Only update the offset if we're not on the last page
        if (event.selected < pageCount) {
            setItemOffset(newOffset);
        }
    };


    /*if (vehicles.length == 0) return <div>Loading...</div>*/

    const getImage = (category) => {
        switch (category) {
            case 'INTERMEDIATE_SUV':
                return 'https://images.unsplash.com/photo-1655284764117-9711c428199b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
            case 'FULL_SIZE_SUV':
                return 'https://images.unsplash.com/photo-1722385640799-4ee84eb90038?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
            case 'COMPACT_AUTO':
                return 'https://images.unsplash.com/photo-1674110958136-40fd83adc9e3?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
            case 'COMPACT_SUV':
                return 'https://images.unsplash.com/photo-1698307861902-1b8a64f9be19?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
            case 'FULL_SIZE_SEDAN':
                return 'https://images.unsplash.com/photo-1606151760469-1d82108f80ed?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
            case 'ECONOMY_CAR':
                return 'https://images.unsplash.com/photo-1655287778401-ce90c81a630f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            default:
                return 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?q=80&w=2898&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; // speedo as a fallback image
        }}


    return ( // the return section displays html
        <Layout>
            <div>
                {/* Nav Bar */}
                <ul className={styles.navMenu}>
                    <li><Link className={styles.nav} href="./">HOME</Link></li>
                    <li><Link className={`${styles.nav} ${styles.active}`} href="./vehiclesDirectory">VEHICLES</Link>
                    </li>
                    <li><Link className={styles.nav} href="./mapsDirectory">MAPS-EMPTY</Link></li>
                    <li><Link className={styles.nav} href="/graphsDirectory">GRAPHS_EMPTY</Link></li>
                </ul>
            </div>

            <div className={styles.contentSection}>
                <h1>Vehicles</h1>

                {/* pagination */}
                <div className={styles.vehiclePanel}>
                    {currentItems.map((vehicle) => (
                        <div key={vehicle.vehicle_rego} className={styles.vehicleCard}>
                            <img src={getImage(vehicle.vehicle_category)} alt={vehicle.vehicle_category}/>
                            <h3>{vehicle.vehicle_rego}</h3>
                            <p>Odometer: {vehicle.odometer} km</p>
                            <p>Category: {vehicle.vehicle_category}</p>
                        </div>
                    ))}
                </div>


                <ReactPaginate
                    breakLabel="..."
                    nextLabel={itemOffset + itemsPerPage < vehicles.length ? "next >" : null}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel={itemOffset > 0 ? "< previous" : null}
                    renderOnZeroPageCount={null}
                    containerClassName={styles.pagination}
                    pageClassName={styles.pageItem}
                    pageLinkClassName={styles.pageLink}
                    previousClassName={itemOffset > 0 ? styles.pageItem : 'hidden'} // Use a hidden class if no previous page
                    previousLinkClassName={itemOffset > 0 ? styles.pageLink : 'hidden'} // Use a hidden class if no previous page
                    nextClassName={itemOffset + itemsPerPage < vehicles.length ? styles.pageItem : 'hidden'} // Use a hidden class if no next page
                    nextLinkClassName={itemOffset + itemsPerPage < vehicles.length ? styles.pageLink : 'hidden'} // Use a hidden class if no next page
                    breakClassName={styles.pageItem}
                    breakLinkClassName={styles.pageLink}
                    activeClassName={styles.active}
                />



            </div>


        </Layout>
);
}
