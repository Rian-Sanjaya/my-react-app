import React from 'react'
import './ProductRow.css'

class ProductRow extends React.Component {
    constructor(props) {
        super(props);
        this.destroy = this.destroy.bind(this);
        this.update = this.update.bind(this);
    }

    destroy() {
        this.props.onDestroy(this.props.product.id);
    }

    update() {
        this.props.onUpdate(this.props.product.id);
    }

    render() {
        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>
                {this.props.product.name}
            </span>;
  
        return (
            <tr>
                <td>
                    {name}
                </td>
                <td>
                    {this.props.product.price}
                </td>
                <td>
                    <button onClick={this.destroy}>x</button>
                    <button onClick={this.update}>!</button>
                </td>
            </tr>
        )
    }
}

export default ProductRow