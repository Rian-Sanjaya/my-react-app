import React from 'react'

const RESET_VALUES = {id: '', category: '', price: '', stocked: false, name: ''};

class ProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
          product: Object.assign({}, RESET_VALUES),
          errors: ''
        };
    }

    handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState((prevState) => {
          prevState.product[name] = value;
          return { product: prevState.product };
        });

        if (name === 'name') {
            this.setState( (prevState) => {
                let val = value === '' ? 'name cannot empty' : '';
                return {errors: val};
            })
        }
    }

    handleSave(e) {
        if (this.state.errors || this.state.product.name === '') {
            this.setState({
                errors: 'name cannot empty'
            })
            return;
        } 

        this.props.onSave(this.state.product);
        this.setState({
          product: Object.assign({}, RESET_VALUES),
          errors: ''
        });
        e.preventDefault();
    }

    render() {
        const { name } = this.props.formProduct;
        if (name) {
            console.log(name);
            // this.setState( (prevState) => {
            //     prevState.product[name] = name;
            //     return { product: prevState.product };
            // });
        }

        return (
            <div>
                <form>
                    <h3>Enter a new product</h3>
                    <p>
                        <label>
                            Name
                            <br/>
                            <input type='text' name='name' onChange={this.handleChange} value={this.state.product.name} />
                            {
                                this.state.errors && 
                                <span>&nbsp;Name cannot empty</span>
                            }
                        </label>
                    </p>
                    <p>
                        <label>
                            Category
                            <br/>
                            <input type='text' name='category' onChange={this.handleChange} value={this.state.product.category} />
                        </label>
                    </p>
                    <p>
                        <label>
                            Price
                            <br/>
                            <input type='text' name='price' onChange={this.handleChange} value={this.state.product.price} />
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type='checkbox' name='stocked' onChange={this.handleChange} checked={this.state.product.stocked} />
                            In stock?
                        </label>
                    </p>
                    <input type='submit' value='Save' onClick={this.handleSave} />
                </form>
            </div>
        )
    }
}

export default ProductForm