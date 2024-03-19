frappe.pages['project-action-panel'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Project Overview for Time Recording',
		single_column: true
	});
	
	// To render html file here.
	$(frappe.render_template("project_action_panel",{})).appendTo(page.body)

	// Calling AJAX call to REST end point.
	frappe.call({
		method: "frappe.desk.page.project_action_panel.project_action_panel.get_projects_data",
		type: "GET",
		callback: function(response) {
			renderTable(response.message);
		}
	});

	var originalData; // To store the original data

	// Render data to table body
	function renderTable(data) {
		var tableBody = $('#project_table tbody');
		tableBody.empty();
		originalData = data; // Store original data
	
		// Iterate over each item in the data array and append a row to the table
		data.forEach(function(item) {
			var row = '<tr>';
			row += '<td>' + item.project_name + '</td>';
			row += '<td>' + item.project_short_description + '</td>';
			row += '<td><a type="button" target="_blank" href="'+ item.gitlab_link +'" class="btn btn-success">'+ item.project_name +'</a></td>';
			row += '</tr>';
			tableBody.append(row); // Append the row to the table body
		});
	}

	$('#project_filter').on('input', function() {
        var searchText = $(this).val().trim().toLowerCase();
        var filteredData;
        if (searchText === '') {
            filteredData = originalData; // Use original data if search text is empty
        } else {
            filteredData = originalData.filter(function(item) {
                return item.project_name.toLowerCase().includes(searchText);
            });
        }
        renderTable(filteredData);
    });
}