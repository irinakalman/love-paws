import names from './data/names.json';
import ages from './data/ages.json';
import desc from './data/descriptions.json';
import images from './data/images.json'

export function generate(props){
    let newProps = { ...props };

    if (!newProps.name){
        newProps.name = names[(Math.floor(Math.random() * names.length))];
    }
    if (!newProps.age){
        newProps.age = ages[(Math.floor(Math.random() * ages.length))];
    } 
    if (!newProps.description){
        newProps.description = desc[(Math.floor(Math.random() * desc.length))];
    }
    if (!newProps.image){
        newProps.image = images[(Math.floor(Math.random() * images.length))];
    }

    return newProps;
}