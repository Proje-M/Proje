import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, StatusBar, ScrollView} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Carousel from 'react-native-anchor-carousel';
import Layout from '../components/global/Layout';

const Targets = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=NYOaIqGhVlM9LAW2vWTLMY5OvhLPGYwO')
          .then((response) => response.json())
          .then((json) => setData(json.results.books))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
    }, []);


const [background,setBackground] = useState({
    uri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQA_-tL18_rj9zEcjN6n41NEaJm-kRNF9UeOtvksZ4z_OW6jRA9',
    name: 'Kitapları Keşfet !',
    soz: '"Bir kitap, içinizdeki donmuş değerleri parçalayarak bir balta olmalıdır."\n FRANZ KAFKA',
    desc: 'Senin için keşfette her ay farklı içerikler sunacağız.\nBu ay ki seçimimiz kitaplar.. \nYukarıdaki kitap çeşitlerinden dilediğini seçerek kitabın adını, yazar bilgisini ve açıklamasını öğrenebilirsin. Beğendiklerin olursa listene eklemeyi unutma! ;)'
})
const carouselRef = useRef(null);

const {width} = Dimensions.get('window')

const renderItem = ({item, index}) => {
    return (
        <View>
            <TouchableOpacity
                onPress={() =>{   
                    carouselRef.current.scrollToIndex(index);
                    setBackground({
                    name: item.title,
                    stat: item.publish,
                    au: item.author,
                    desc: item.description
                    })
                }
                }
            >
                <Image source={{uri: item.book_image}} style={styles.carouselImage} />                
            </TouchableOpacity>
        </View>
    )
}

return (
    <Layout navigation={navigation} bold title="Senin için Seçtiklerimiz">
        <ScrollView style={{backgroundColor: '#000'}} blurRadius={100}>
            <StatusBar backgroundColor='#000' barStyle='light-content' />
            <View style={styles.carouselContentContainer}>
                <View style={{...StyleSheet.absoluteFill, backgroundColor: '#0F0F21'}}>
                    <View style={styles.carouselContainerView}>
                        <Carousel style={styles.carousel}
                            data={data}
                            renderItem={renderItem}
                            itemWidth={200}
                            containerWidth={width - 20}
                            separatorWidth={0}
                            ref={carouselRef}
                            inActiveOpacity={0.4}
                        />
                    </View>
                    <View style={styles.movieInfoContainer}>
                        <View style={{ justifyContent: 'center'}}>
                            <Text style={styles.movieName}>{background.name}</Text>
                        </View>
                    </View>
                    <View style={{paddingHorizontal: 14, marginTop: 5}}>
                        <Text style={{color: 'white', opacity: 0.8, lineHeight: 20}}>
                        {background.soz} 
                        </Text>
                        <Text style={{color: 'white', opacity: 0.8, lineHeight: 20}}>
                        {background.au}
                        </Text>
                        <Text style={{color: 'white', opacity: 0.8, lineHeight: 30, marginTop:15, fontSize:20}}>
                        {background.desc}
                        </Text>
                        
                    </View>
                </View>
            </View>
        </ScrollView>
    </Layout>
);
}

const styles = StyleSheet.create({


// CAROUSEL STYLES

carouselImage: {
width: 200,
height: 320,
borderRadius: 10,
alignSelf: 'center',
backgroundColor: 'rgba(0,0,0,0.9)'
},
carouselText: {
paddingLeft: 14,
color: 'white',
position: 'absolute',
bottom: 10,
left: 2,
fontWeight: 'bold'
},
carouselIcon: {
position: 'absolute',
top: 15,
right: 15
},
carouselContentContainer: {
flex: 1,
backgroundColor: '#000',
height: 720,
paddingHorizontal: 14
},
SearchboxContainer: {
flexDirection: 'row',
marginVertical: 20,
width: '95%',
alignSelf: 'center',
backgroundColor: '#fff',
elevation: 10,
borderRadius: 4,
},
Searchbox: {
padding: 12,
paddingLeft: 20,
fontSize: 16,
},
SearchboxIcon: {
position: 'absolute',
right: 20,
top: 14
},
ImageBg: {
flex: 1,
height: null,
width: null,
opacity: 1,
justifyContent: 'flex-start',
},
carouselContainerView: {
width: '100%',
height:350 ,
justifyContent: 'center',
alignItems: 'center',
},
carousel: {
flex:1,
overflow: 'visible',
} ,
movieInfoContainer: {
flexDirection: 'row',
marginTop: 16,
justifyContent: 'space-between',
width: Dimensions.get('window').width - 14
},
movieName: {
paddingLeft: 14,
color: 'white',
fontWeight: 'bold',
fontSize: 20,
marginBottom: 6
},
movieStat: {
paddingLeft: 14,
color: 'white',
fontWeight: 'bold',
fontSize: 14,
opacity: 0.8
},
playIconContainer: {
backgroundColor: '#212121',
padding: 18,
borderRadius: 40,
justifyContent: 'center',
alignItems: 'center',
elevation: 25,
borderWidth: 4,
borderColor: 'rgba(2, 173, 148, 0.2)',
marginBottom: 14
}
});

export default Targets;
