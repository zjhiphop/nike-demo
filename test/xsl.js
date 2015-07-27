
function App() {
	
	var express = require('express');

	/// source: http://stackoverflow.com/a/14496573/1057087
	function heredoc (f) {
	    return f.toString().match(/\/\*\s*([\s\S]*?)\s*\*\//m)[1];
	};
	
	var routes = {
		index: function(req,res,next) {
			res.send('Please, visit <a href="/export">/export</a>');
		},

		export_xls: function(req,res, next) {
			var xmlTemplate = heredoc(function(){/*
				<?xml version="1.0"?>
			    <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
			      xmlns:o="urn:schemas-microsoft-com:office:office"
			      xmlns:x="urn:schemas-microsoft-com:office:excel"
			      xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
			      xmlns:html="http://www.w3.org/TR/REC-html40">
			      <Worksheet ss:Name="Sheet1">
			        <Table>
			          <Row>
			            <Cell><Data ss:Type="String">Nome</Data></Cell>
			            <Cell><Data ss:Type="String">Email</Data></Cell>
			            <Cell><Data ss:Type="String">Data de cadastro</Data></Cell>
			          </Row>
			          {% for user in users %}
			            <Row>
			            <Cell><Data ss:Type="String">{{ user.name }}</Data></Cell>
			            <Cell><Data ss:Type="String">{{ user.email }}</Data></Cell>
			            <Cell><Data ss:Type="String">{{ user.created_at|date('d/m/Y H:i:s') }}</Data></Cell>
			            </Row>
			          {% endfor %}
			        </Table>
			      </Worksheet>
			    </Workbook>
			  */});
			  
			var users = {
				users: [
				{name: 'Rafael Fidelis', email: 'rafa_(..)@yahoo.com.br', created_at: Date.now()},
			      	{name: 'User #1', email: 'user_1(...)@gmail.com', created_at: Date.now()},
			      	{name: 'Other user ', email: 'other@user.com', created_at: Date.now()}
			    ]
			}
			  
			var swig  = require('swig')
			, template = swig.compile(xmlTemplate)
			, output = template(users);

			var filename = ['XLS Export - ', Date.now()].join('')
			
			res.set('Content-Disposition', ["attachment; filename='", filename, ".xls'"].join(''))
			res.end(output);
		}
	}

	return {
		init: function(cb) {
			var app 
			,   self = this;

			app = self.app = express();

			app.set('port', 3000)

			app.get('/export', routes.export_xls)
			app.get("/", routes.index)

			app.listen(app.get('port'));

			cb.call(app, app)
		}
	}
}

var ExportApp = new App();

ExportApp.init(function(app){
	console.log('Express server listening on http://127.0.0.1:' + app.get('port'));
})