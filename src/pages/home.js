import React from 'react';
import Title from '../components/Atom/Title';
import SearchInput from '../components/Organism/SearchInput';
import ProductsSection from '../components/Organism/ProductsSection';

function Home() {
    return (
        <div class="row">
            <div class="col">     
                <div class="row">
                    <div class="col">
                        <Title title="Home"></Title>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchInput></SearchInput>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <ProductsSection></ProductsSection>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;