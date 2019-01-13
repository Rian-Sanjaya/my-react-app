import React from 'react'
import ProductTableHeader from './ProductTableHeader'
import ProductRow from './ProductRow'
import SortableColumnHeader from './SortableColumnHeader'

class ProductTable extends React.Component {
    constructor(props) {
        super(props);

        this.sortByKeyAndOrder = this.sortByKeyAndOrder.bind(this);
        this.handleDestroy = this.handleDestroy.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSort = this.handleSort.bind(this);

        this.state = {
          sort: {
            column: 'name',
            direction: 'desc'
          }
        };
    }

    sortByKeyAndOrder(objectA, objectB) {
        let isDesc = this.state.sort.direction === 'desc' ? 1 : -1;
        let [a, b] = [objectA[this.state.sort.column], objectB[this.state.sort.column]];
        if (this.state.sort.column === 'price') {
            [a, b] = [a, b].map( (value) => parseFloat(value.replace(/[^\d\.]/g, ''), 10) );
        }
        if (a > b) {
            return 1 * isDesc;
        }
        if (a < b) {
            return -1 * isDesc;
        }
        return 0;
    }

    sortProducts() {
        // make an array of object

        // Object.keys[this.props.products] => ["1", "2", "3", "4", "5", "6"]
        // Object.keys(this.props.products).map( (pid) => this.props.products[pid] ) =>
        // [ 
        //  {id: 1, category: "Musical Instruments", price: "$459.99", stocked: true, name: "Clarinet"},
        //  {id: 2, category: "Musical Instruments", price: "$5,000", stocked: true, name: "Cello"},
        //  {id: 3, category: "Musical Instruments", price: "$11,000", stocked: false, name: "Fortepiano"},
        //  {id: 4, category: "Furniture", price: "$799", stocked: true, name: "Chaise Lounge"},
        //  {id: 5, category: "Furniture", price: "$1,300", stocked: false, name: "Dining Table"},
        //  {id: 6, category: "Furniture", price: "$100", stocked: true, name: "Bean Bag"} 
        // ]
        let productsAsArray = Object.keys(this.props.products).map( (pid) => this.props.products[pid] );
        return productsAsArray.sort(this.sortByKeyAndOrder);
    }

    handleDestroy(id) {
        this.props.onDestroy(id);
    }

    handleUpdate(id) {
        this.props.onUpdate(id);
    }

    handleSort(column, direction) {
        this.setState({
          sort: {
            column: column,
            direction: direction
          }
        });
    }
    
    render() {
        // filter product based of filtered text or stocked only if checked
        let rows = [];
        this.sortProducts().forEach( (product) => {
            // if product name not contain the filter text or (product not in stocked and the in stock only is checked) then return
            // else push in rows of product array
            if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
              return;
            }
            rows.push(
                <ProductRow 
                    product={product} 
                    key={product.id} 
                    onDestroy={this.handleDestroy}
                    onUpdate={this.handleUpdate}
                />
            );
        });

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <SortableColumnHeader
                                onSort={this.handleSort}
                                currentSort={this.state.sort}
                                column="name"
                            />
                            <SortableColumnHeader
                                onSort={this.handleSort}
                                currentSort={this.state.sort}
                                column="price"
                            />
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProductTable