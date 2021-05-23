"use strict";

function displayData (data)  {

    let html = "";
    let checkBoxes = [];

    if (data.eror) {
        html += `<span class="error">${data.error.message}</span>`;
    }
    else if (data.code) {
        html += `<span class="error">${data.msg}</span>`;
    }
    else {
        html = ""

        checkBoxes = $("#categories input[type=checkbox]:checked").each(function () {
            checkBoxes.push(this.value);   
        });

        html += `<h3>${data.search_player_all.queryResults.row.name_first} 
        ${data.search_player_all.queryResults.row.name_last}</h3>`;
        
        for (let i = 0; i < checkBoxes.length; i++) {
            console.log(checkBoxes[i].value);

            if (checkBoxes[i].value == "height") {
                html += `<p>Height: ${data.search_player_all.queryResults.row.height_feet}' ${data.search_player_all.queryResults.row.height_inches}"</p>`
            }
            else if (checkBoxes[i].value == "weight") {
                html += `<p>Weight: ${data.search_player_all.queryResults.row.weight}</p>`
            }
            else if (checkBoxes[i].value == "position") {
                html += `<p>Position: ${data.search_player_all.queryResults.row.position}</p>`
            }
            else if (checkBoxes[i].value == "birth_date") {
                html += `<p>Birthday: ${data.search_player_all.queryResults.row.birth_date}</p>`
            }
            else if (checkBoxes[i].value == "birth_place") {
                html += `<p>Born: ${data.search_player_all.queryResults.row.birth_city}, 
                ${data.search_player_all.queryResults.row.birth_state} 
                ${data.search_player_all.queryResults.row.birth_country}</p>`
            }
            else if (checkBoxes[i].value == "high_school") {
                html += `<p>High School: ${data.search_player_all.queryResults.row.high_school}</p>`
            }
            else if (checkBoxes[i].value == "college") {
                html += `<p>College: ${data.search_player_all.queryResults.row.college}</p>`
            }
            else if (checkBoxes[i].value == "league") {
                html += `<p>League: ${data.search_player_all.queryResults.row.league}</p>`
            }
            else if (checkBoxes[i].value == "team_full") {
                html += `<p>Team: ${data.search_player_all.queryResults.row.team_full}</p>`
            }
            else if (checkBoxes[i].value == "bats") {
                html += `<p>Bats: ${data.search_player_all.queryResults.row.bats}</p>`
            }
            else if (checkBoxes[i].value == "throws") {
                html += `<p>Throws: ${data.search_player_all.queryResults.row.throws}</p>`
            }   
        }
    }

    $("#display").html(html);
};

const displayError = error => {
    let html = `<span class="error">${error.message}</span>`;
    $("#display").html(html);
};

$(document).ready( () => {

    let nextSlide = $("#slides img:first-child");
        
    setInterval( () => {   
        $("#caption").fadeOut(1000);
        $("#slide").fadeOut(1000,
            () => {
                if (nextSlide.next().length == 0) {
                    nextSlide = $("#slides img:first-child");
                }
                else {
                    nextSlide = nextSlide.next();
                }
                const nextSlideSource = nextSlide.attr("src");
                const nextCaption = nextSlide.attr("alt");
                $("#slide").attr("src", nextSlideSource).fadeIn(1000);                    
                $("#caption").text(nextCaption).fadeIn(1000);
            });    
    },
    5000); 
    
    $("#view_button").click( () => {

        const userInput = $("#player").val();
        let playerStatus = $(":radio:checked").val();
        let categoriesSelected = $(":checkbox:checked").val();

        if (userInput == "") {
            const msg = "Please enter a player name."
            $("#display").html(`<span class="error">${msg}</span>`);
        }
        else if (categoriesSelected == null) {
            const msg = "Please select at least one category."
            $("#display").html(`<span class="error">${msg}</span>`);
        }
        else {

            const domain = `http://lookup-service-prod.mlb.com/json/named.search_player_all.bam`;
            const request = `?sport_code=%27mlb%27&active_sw=%27${playerStatus}%27&name_part=%27${userInput}%25%27`;
            const url = domain + request;

            fetch(url)
                .then( response => response.json() )
                .then( json => displayData(json) )
                .catch( e => displayError(e) );
        }
    })
});