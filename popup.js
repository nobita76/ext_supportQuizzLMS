/*
*
*	Bùi Ngọc Thành
*	Nobita76.Info
*/
function loadAnswer_PS10511() {
    chrome.tabs.getSelected(null, async function (tab) { // null defaults to current window
		var currentUrl=tab.url;
		try{
			ref_id = currentUrl.match(/ref_id=([0-9]+)/)[1] || 236878;
		active_id = currentUrl.match(/active_id=([0-9]+)/)[1] || 601231;
		//evaluation = currentUrl.match(/evaluation=([0-9]+)/)[1];
		var sequence = currentUrl.match(/sequence=([0-9]+)/)[1];

let urlGetID = 'http://hcm-lms.poly.edu.vn/ilias.php?ref_id='+ref_id+'&active_id='+active_id+'&pass=0&cmd=outUserPassDetails&cmdClass=iltestevaluationgui&cmdNode=q4:ll:vx&baseClass=ilrepositorygui';
        let responseGetID = await fetch(urlGetID);
        let textGetID = await responseGetID.text();

        var tbody = textGetID.split('<tbody>')[1].split('</tbody>')[0];
        tbody = '<table><tbody>'+tbody+'</tbody></table>';
        console.log(tbody);	
        document.getElementById('contentHtmlGetID').innerHTML = tbody;
        var ps10511 = document.querySelectorAll('tr');

        var evaluation = ps10511[sequence-1].cells[1].innerText;
        console.log(evaluation);
		let url = 'http://hcm-lms.poly.edu.vn/ilias.php?ref_id='+ref_id+'&active_id='+active_id+'&evaluation='+evaluation+'&cmd=outCorrectSolution&cmdClass=iltestevaluationgui&cmdNode=q4:ll:vx&baseClass=ilrepositorygui';
        let response = await fetch(url);
        let text = await response.text();
        var contentHTML = text.split('ilc_question_Standard')[2].split('</table>')[0]+"</table>";
        document.getElementById('contentHtml').innerHTML = contentHTML;

        var inputs = document.getElementsByName('multiple_choice_result_q'+evaluation+'_bestsolution');

        inputs.forEach(function(ps10511, thanh, arr){
		    if(ps10511.checked){
		    console.log(ps10511.nextSibling.parentElement.nextElementSibling.innerText.replace('				'
, ''));
		  var answer = ps10511.nextSibling.parentElement.nextElementSibling.innerHTML.split('<span>')[1].split('</span>')[0];
		    document.getElementById('answer').innerHTML = "<b><font color='red'>"+answer+"</font></b>";
		    }

		});
		}catch(err){
			console.log(err);
			document.getElementById('answer').innerHTML = "<b><font color='red'>Lỗi rùi</font></b>";

		}
		return;
		
        
		
    });
}


loadAnswer_PS10511();
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        chrome.tabs.getSelected(null, function (tab2) { // null defaults to current window
            if (tab2.id == tabId) {
                loadAnswer_PS10511();
            }
        });
    }
})
document.addEventListener('DOMContentLoaded', function () {
    
	console.log("Thành đẹp trai");	
	document.getElementById('getAnsAgain').onclick = function(){
		document.getElementById('answer').innerHTML = "<b>Đang get lại, đợi tí nha bạn ei</b>";
		loadAnswer_PS10511();
	}
});
