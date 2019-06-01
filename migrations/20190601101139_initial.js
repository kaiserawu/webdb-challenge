
exports.up = async function(knex) {
  await knex.schema.createTable('projects', tbl => {
    tbl.increments();
    tbl.string('name').unique().notNullable();
    tbl.string('description').notNullable();
    tbl.boolean('completion').defaultTo(false);
  })

  await knex.schema.createTable('actions', tbl => {
    tbl.increments();
    tbl.string('description').notNullable();
    tbl.string('notes');
    tbl.boolean('completion').defaultTo(false);
    tbl.integer('project_id').references('id').inTable('projects').onDelete('CASCADE').onUpdate('CASCADE').notNullable();
  })

};

exports.down = async function(knex) {
  
};
