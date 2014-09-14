var EmployeeManagementRole = function (rolesBlock) {
  this.jsonEmployee = [{'name':'Jitendra'}, {'name':'Priyank'}, {'name':'Hemant'}, {'name':'Satish'}, {'name':'Ashwani'}, {'name':'Chhavi'}];
  this.jsonRoles = [{'type' : 'Rails Developers'}, {'type' : 'iOS Developers'}, {'type' : 'Front-end Developers'}];
  this.rolesBlock = rolesBlock;
}

EmployeeManagementRole.prototype.initMethods = function () {
  this.createEmployeesRolesAndTodosLists();
  this.dragAndDropEmployeeName();
  this.bindEvents();
}

EmployeeManagementRole.prototype.createEmployeesRolesAndTodosLists = function () {
  this.createEmployeeList();
  this.createRolesList();
  this.createTodosList();
}

EmployeeManagementRole.prototype.createEmployeeList = function () {
  var _this = this,
      data = _this.jsonEmployee;

  for(i = 0; i < data.length; i++) {
    $('<li/>').attr('name', data[i].name).addClass('emp-row').append(data[i].name).appendTo('#employees .emp-list');
  }
}

EmployeeManagementRole.prototype.createRolesList = function () {
  var _this = this,
      data = _this.jsonRoles,
      $container = $('#roles');

  for(i = 0; i < data.length; i++) {
    var $block = $('<div/>').attr('id', data[i].type.replace(' Developers', '').toLowerCase()).addClass('roles-block'),
        $h3 = $('<h3/>').text(data[i].type),
        $ul = $('<ul/>').addClass('roles-list');

    $h3.appendTo($block);
    $ul.appendTo($block);
    $block.appendTo($container);
  }
}

EmployeeManagementRole.prototype.createTodosList = function () {
  var _this = this,
      data = _this.jsonRoles,
      $container = $('#todos');

  for(i = 0; i < data.length; i++) {
    var $block = $('<div/>').attr('data-todo', data[i].type.replace(' Developers', '').toLowerCase()).addClass('todos-block'),
        $h3 = $('<h3/>').text(data[i].type),
        $blockLink = $('<a/>').attr('href', 'javascript:').addClass('collapse');
        $holder = $('<div/>').addClass('todos');

    $h3.appendTo($block);
    $blockLink.appendTo($block);
    $holder.appendTo($block);
    $block.appendTo($container);
  }
}

EmployeeManagementRole.prototype.dragAndDropEmployeeName = function () {
  this.draggableEmployeeName();
  this.droppableEmployeeName();
}

EmployeeManagementRole.prototype.draggableEmployeeName = function () {
  $('li.emp-row').draggable({
    helper: 'clone',
    start: function () {
      $(this).addClass('dragging');
    },
    stop: function () {
      $(this).removeClass('dragging');
    }
  });
}

EmployeeManagementRole.prototype.droppableEmployeeName = function () {
  var _this = this;
  $('.roles-list').droppable({
    accept: 'li',
    drop: function () {
      var $this = $(this),
          $dragging = $('.dragging'),
          $name = $dragging.text(),
          $containerID = $this.parent(_this.rolesBlock).attr('id');

      if(!$dragging.hasClass($containerID)) {
        _this.createEmployeeRole($name, $containerID, $dragging, $this);
        _this.createTodosBlocks($name, $containerID);
      }
    }
  });
}

EmployeeManagementRole.prototype.createEmployeeRole = function (name, id, dragging, thisRole) {
  var _this = this;
  dragging.addClass(id);

  $('<li/>').addClass('roles-row').text(name).appendTo(thisRole);
  $('<a/>').attr({'href': 'javascript:', 'data-name': name.trim()}).addClass('remove').prependTo('.roles-row');
}

EmployeeManagementRole.prototype.createTodosBlocks = function (name, id) {
  var $empNameDiv = $('<div/>').addClass('todos-emp').text(name),
      $todoDiv = $('<div/>').addClass('todos-section').text('Add todos for ' + name + ' here.'),
      $addTodosLink = $('<a/>').attr('href', 'javascript:').addClass('add-todos'),
      $todoBlockHolder = $('<div/>').addClass('todos-holder todos-' + name),
      $todosBlock = $('#todos').find('div[data-todo = "' + id + '"]').children('.todos');

  $empNameDiv.appendTo($todoBlockHolder);
  $addTodosLink.prependTo($todoDiv);
  $todoDiv.appendTo($todoBlockHolder);
  $todoBlockHolder.appendTo($todosBlock);
}

EmployeeManagementRole.prototype.bindEvents = function () {
  this.expandOrCollapseTodoSection();
  this.removeCreatedRolesAndTodosBlock();
}

EmployeeManagementRole.prototype.expandOrCollapseTodoSection = function () {
  $('.todos-block').delegate('.collapse','click', function () {
    $(this).toggleClass('expand').parent('.todos-block').find('.todos').slideToggle();
  });
}

EmployeeManagementRole.prototype.removeCreatedRolesAndTodosBlock = function () {
  var _this = this;
  $(_this.rolesBlock).delegate('.remove', 'click', function () {
    var $this = $(this);
    if(confirm('Are you sure you want to delete ' + $this.parents(_this.rolesBlock).attr('id') + ' role of ' + $this.parent('li').text() + '?')) {
      $('#todos').find('div[data-todo =' + $this.parents(_this.rolesBlock).attr('id') + ']').find('.todos-' + $this.parent('li').text()).remove();
      $('#employees').find('li[name = ' + $this.parent('li').text() + ']').removeClass($this.parents(_this.rolesBlock).attr('id'));
      $this.parent('li').detach();
    }
  });
}

$(document).ready(function () {
  var employeeManagementRole = new EmployeeManagementRole('.roles-block');
  employeeManagementRole.initMethods();
});