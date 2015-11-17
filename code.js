window.addEventListener('DOMContentLoaded', function () {
    (function (global) {
        var mapArray;

        if (!global.UAM) {
            global.UAM = {};
        }
        global.UAM.aircrafts = [];

        global.UAM.addAircraft = function (newAircraftCode) {
            var obj = {
                code: newAircraftCode,
                services: []
            }
            global.UAM.aircrafts.push(obj)
            return obj;

        };
        function indexofname(name) {
            for (var x = 0; x < global.UAM.aircrafts.length; x++) {
                if (global.UAM.aircrafts[x].code === name) {
                    return global.UAM.aircrafts[x];
                }
            }
        }
        global.UAM.removeAircraft = function (aircraftObj) {
            index = global.UAM.aircrafts.indexOf(indexofname(aircraftObj));
            if (index > -1) {
                global.UAM.aircrafts.splice(index, 1);
            }
        };
        global.UAM.addWorkToAircraft = function (aircraftObj, name_, timeToExecute_) {
            index = global.UAM.aircrafts.indexOf(indexofname(aircraftObj));
            global.UAM.aircrafts[index].services.push(
                {
                    name: name_,
                    timeToExecute: timeToExecute_
                });
        };
        global.UAM.reduceTimeToExecute = function (name_, time) {
            index = global.UAM.aircrafts.indexOf(indexofname(name_))
            for (var i = 0; i < global.UAM.aircrafts[index].services.length; i++) {
                global.UAM.aircrafts[index].services[i].timeToExecute = global.UAM.aircrafts[index].services[i].timeToExecute - time;
            }
        };
        global.UAM.getAircraftsForRepairs = function (maxTimeToExecute) {
            for (var i = 0; i < global.UAM.aircrafts.length; i++) {
                for (var j = 0; j < global.UAM.aircrafts[i].services.length; j++) {
                    if (global.UAM.aircrafts[i].services[j].timeToExecute <= maxTimeToExecute) {
                        global.UAM.aircrafts[i].services.splice(j, 1);
                    }
                }
            }
        }


        var newAircraft1 = global.UAM.addAircraft("SP-XY1");
        var newAircraft2 = global.UAM.addAircraft("Helikopter");
        var newAircraft3 = global.UAM.addAircraft("SD-KJH");
        var newAircraft3 = global.UAM.addAircraft("AB-CDZ");
        var newAircraft3 = global.UAM.addAircraft("DZ-UYI");

        global.UAM.addWorkToAircraft('Helikopter', 'Malowanie', 110);
        global.UAM.addWorkToAircraft('Helikopter', 'Sprzatanie', 100);
        global.UAM.addWorkToAircraft('Helikopter', 'Lakierowanie', 200);
        global.UAM.addWorkToAircraft('Helikopter', 'Wymiana oleju', 300);
        global.UAM.addWorkToAircraft('SP-XY1', 'Wymiana oleju', 150);
        global.UAM.addWorkToAircraft('SD-KJH', 'Malowanie', 120);
        global.UAM.addWorkToAircraft('SD-KJH', 'Sprzatanie', 180);
        global.UAM.addWorkToAircraft('AB-CDZ', 'Lakierowanie', 170);
        global.UAM.addWorkToAircraft('DZ-UYI', 'Wymiana swiatel', 210);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        function refresh() {
            var table = document.getElementById("tab");
            table.innerHTML=' '

            var row0 = table.insertRow(0);
            var cell0 = row0.insertCell(0);
            var cell1 = row0.insertCell(1);
            var cell2 = row0.insertCell(2);
            cell0.innerHTML = 'Nazwa samolotu:'
            cell1.innerHTML = 'Nazwa serwisu:'
            cell2.innerHTML = 'Czas oczekiwania:'

            for (var i = 0; i < global.UAM.aircrafts.length; i++) {
                var row = table.insertRow(table.rows.length);
                var cell = row.insertCell(0);
                cell.innerHTML = global.UAM.aircrafts[i].code;

                if (global.UAM.aircrafts[i].services != 0) {
                    var cell1 = row.insertCell(1)
                    cell1.innerHTML = global.UAM.aircrafts[i].services[0].name
                    var cell2 = row.insertCell(2)
                    cell2.innerHTML = global.UAM.aircrafts[i].services[0].timeToExecute
                    if (global.UAM.aircrafts[i].services.length > 1) {
                        for (var j = 1; j < global.UAM.aircrafts[i].services.length; j++) {
                            var k = table.rows.length
                            var row1 = table.insertRow(k)
                            var cell0 = row1.insertCell(0)
                            cell0.innerHTML = '  '
                            cell1 = row1.insertCell(1)
                            cell2 = row1.insertCell(2)
                            cell1.innerHTML = global.UAM.aircrafts[i].services[j].name;
                            cell2.innerHTML = global.UAM.aircrafts[i].services[j].timeToExecute;
                            k++
                        }
                    }
                }
            }
        }
        function addclick(){
            var name = document.getElementById('txt_aeroname').value
            global.UAM.addAircraft(name)
            refresh()
        }
        function remaero(){
            var name=document.getElementById('txt_del').value
            global.UAM.removeAircraft(name)
            refresh()
        }
        function cleararea(text){
            text.value=''
        }
        function newserv(){
            var name=document.getElementById('txt_ser').value
            var time=document.getElementById('txt_sertime').value
            var aero=document.getElementById('txt_aeroser').value
            if (indexofname(aero)=== undefined)
            {
                global.UAM.addAircraft(aero)
                global.UAM.addWorkToAircraft(aero,name,time)
            }
            else{
                global.UAM.addWorkToAircraft(aero, name,time)
            }
            refresh()
        }
        function reducetime(){
            var name=document.getElementById('txt_redtimename').value
            var time=document.getElementById('txt_redtime').value
            global.UAM.reduceTimeToExecute(name,time)
            refresh()
        }
        function doworks()
        {
            var time=document.getElementById('txt_treshold').value
            global.UAM.getAircraftsForRepairs(time)
            refresh()
        }

        refresh()
        var addnew = document.getElementById('add_b')
        addnew.addEventListener('click',addclick)
        var rem=document.getElementById('rem_b')
        rem.addEventListener('click',remaero)
        var addser=document.getElementById('addwork_b')
        addser.addEventListener('click',newserv)
        var redtime=document.getElementById('red_b')
        redtime.addEventListener('click',reducetime)
        var doserv=document.getElementById('do_b')
        doserv.addEventListener('click',doworks)

        var text=document.getElementById('txt_aeroname')
        text.addEventListener('focus',function(){
            cleararea(text)
        })
        var text1=document.getElementById('txt_del')
        text1.addEventListener('focus',function(){
            cleararea(text1)
        })
        var text2=document.getElementById('txt_sertime')
        text2.addEventListener('focus',function(){
            cleararea(text2)
        })
        var text3=document.getElementById('txt_ser')
        text3.addEventListener('focus',function(){
            cleararea(text3)
        })
        var text4=document.getElementById('txt_redtimename')
        text4.addEventListener('focus',function(){
            cleararea(text4)
        })
        var text5=document.getElementById('txt_redtime')
        text5.addEventListener('focus',function(){
            cleararea(text5)
        })
        var text6=document.getElementById('txt_treshold')
        text6.addEventListener('focus',function(){
            cleararea(text6)
        })
        var text7=document.getElementById('txt_aeroser')
        text7.addEventListener('focus',function(){
            cleararea(text7)
        })








    }(window));
});
