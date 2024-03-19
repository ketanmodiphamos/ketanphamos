import frappe

@frappe.whitelist()
def get_projects_data(project_name=None):
    filters = {}
    if project_name:
        filters['project_name'] = project_name
    
    projects = frappe.db.get_list('Project Action Panel Management', 
                                fields=['project_name', 'project_short_description', 'gitlab_link'],
                                filters=filters,
                                order_by='creation'
                                )

    if not projects:
        frappe.throw("You do not have access to this employee records !!!")
    return projects