
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        var firebaseConfig = {
          apiKey: "AIzaSyAgwgQU57SYUJE2zDKbvoLdpTWc8DtwCZ0",
          authDomain: "personal-website-d9161.firebaseapp.com",
          databaseURL: "https://personal-website-d9161-default-rtdb.firebaseio.com",
          projectId: "personal-website-d9161",
          storageBucket: "personal-website-d9161.appspot.com",
          messagingSenderId: "326637699745",
          appId: "1:326637699745:web:54831aedb9927f0ccfe6e0",
          measurementId: "G-SK5YHDXQ1X"
        };
        firebase.initializeApp(firebaseConfig);
        let diary_data = firebase.database().ref("data");
        document.querySelector(".add_data").addEventListener("click", submitForm);
        function submitForm(e) {
            e.preventDefault();
            //   Get input Values
            let date = document.querySelector("#date_box").value;
            let message = document.querySelector("#text_box").value;
            let diary_image= document.querySelector("#text_image");
            if( diary_image.value==""){
                var image=null;
            }
            else if(date=="" && message=="" && diary_image.value==""){
                alert("You need to fill something to your diary");
            }
            else{
                var image=URL.createObjectURL(diary_image.files[0]);
            
                saveDiary(date,message,image);
                    display_diary();


                // Save infos to Firebase
                function saveDiary(date,message,image) {
                let newDiary = diary_data.push();

                newDiary.set({
                    date:date,
                    message:message,
                    image:image,
                });
                alert("Added")
                }
                var data_array=new Array();
                var data_diary=new Array();
                function display_diary(){
                    firebase.database().ref("data").once("value",function(snapshot){
                        snapshot.forEach(function(childSnapshot){
                            var childKey=childSnapshot.key;
                            var childData=childSnapshot.val();
                            data_array=[childData["date"],childData["message"],childData["image"]];
                            data_diary.push(data_array);
                        });
                        // diary=data_diary.reverse();
                        // for(let i=0;i<data_diary.length;i++){
                        //     for(let j=0;j<3;i++){
                        //         document.querySelector(".diary").innerHTML=data_diary[i][j];
                        //     }
                        // }
                        
                        
                    });
                    
                }
            }
    }

        
        
