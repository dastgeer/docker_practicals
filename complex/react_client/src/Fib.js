import React,{Component} from 'react';
import axios from 'axios';

class Fib extends Component {
    state ={
        seenIndexes: [],
        values:{},
        index:'',
    };

    componentDidMount(){
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues(){
        const values=   await axios.get('/api/values/current');
        this.setState({values: values.data});
    }

    async fetchIndexes(){
        const indexes = await axios.get('/api/values/all');
        this.setState({
		seenIndexes: indexes.data,
	});
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('/api/values', {
            index: this.state.index,
          });
          this.setState({ index: '' });
    } 
    renderSeenIndexes(){
       return  this.state.seenIndexes.map(({number})=>number).join(', ');
    }

    renderValues(){

        let entries = [];
        for(let key in this.state.values){
            entries.push(
                <div key={key}>
                    For index {key}  i calculated {this.state.values[key]}
                </div>
            );
        }
	return entries;
    }


    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>enter your index</label>
                  <input
            value={this.state.index}
            onChange={(event) => this.setState({ index: event.target.value })}
          />
                    <button> submit</button>
                </form>
                <h3> I have seen indexes :</h3>
                {this.renderSeenIndexes()}

                <h3>calculated values:</h3>
                {this.renderValues()}
            </div>
        );
    }

}

export default Fib;