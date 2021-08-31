
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        var firebaseConfig = {
            apiKey: "AIzaSyC9BIN5f2zosY0bBlQtg48DdZANacXig8E",

            authDomain: "diary-7056c.firebaseapp.com",
          
            databaseURL: "https://diary-7056c-default-rtdb.europe-west1.firebasedatabase.app",
          
            projectId: "diary-7056c",
          
            storageBucket: "diary-7056c.appspot.com",
          
            messagingSenderId: "1060511834179",
          
            appId: "1:1060511834179:web:89584c00ce955b9b2734f6",
          
            measurementId: "G-EX8T862X3F"
          


        };

        firebase.initializeApp(firebaseConfig);

        let diary_data = firebase.database().ref("data");
        document.querySelector(".add_data").addEventListener("click", submitForm);
        function submitForm(e) {
            document.querySelector(".diary").innerHTML="";
            e.preventDefault();
            //   Get input Values
            let date = document.querySelector("#date_box").value;
            let message = document.querySelector("#text_box").value;
            let diary_image= document.querySelector("#text_image");
            
            if(date=="" && message=="" && diary_image.value==""){
                alert("You need to fill something to your diary");
            }
            else if( diary_image.value==""){
                var image="";
                saveDiary(date,message,image);
            }
            else{
                var image=URL.createObjectURL(diary_image.files[0]);
                saveDiary(date,message,image);

            }
                function saveDiary(date,message,image) {
                let newDiary = diary_data.push();

                newDiary.set({
                    date:date,
                    message:message,
                    image:image,
                });
                alert("Added");
                display_diary();
                }
        }
                let diary_array=[];
                let diary_list=[];
                function display_diary(){
                    firebase.database().ref("data").once("value",function(snapshot){
                        snapshot.forEach(function(childSnapshot){
                            var childKey=childSnapshot.key;
                            var childData=childSnapshot.val();
                            data_array=[childData["date"],childData["message"],childData["image"]];
                            
                            diary_array=[childData["date"],childData["message"],childData["image"]]
                            diary_list.push(diary_array);
                           
                        });
                        diary_list.reverse();
                        
                        for(var i=0;i<diary_list.length;++i){
                            
                            for(var j=0;j<2;++j){
                                document.querySelector(".diary").innerHTML+=diary_list[i][j]+'</br>';
                            }
                            var img = document.createElement('img');
                            img.src = diary_list[i][2];
                            document.querySelector(".diary").appendChild(img);
                            document.querySelector(".diary").innerHTML+="</br>";

                        }
                        
                        
                    });

                    
                
            
    }

        
        
