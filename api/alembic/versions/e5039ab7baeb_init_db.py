"""Init DB

Revision ID: e5039ab7baeb
Revises: 
Create Date: 2020-04-29 15:40:20.462892

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'e5039ab7baeb'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table("notes",
                    sa.Column("id", sa.Integer, autoincrement=True, primary_key=True),
                    sa.Column("content", sa.Text, nullable=False, unique=False),
                    sa.Column("tags", sa.JSON, nullable=False))


def downgrade():
    op.drop_table("notes")
